import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const validationSchema = toTypedSchema(
    zod.object({
        name: zod.string().min(1, { message: "Campo Obrigatório" }),
        ra: zod.string().min(1, { message: "Campo Obrigatório" }),
        email: zod.string().email({ message: "E-mail inválido" }).min(1, { message: "Campo Obrigatório" }),
        cpf: zod.string().refine((cpf: string) => {
            if (typeof cpf !== "string") return false;
            cpf = cpf.replace(/[^\d]+/g, "");
            if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
            const cpfDigits = cpf.split("").map((el) => +el);
            const rest = (count: number): number => {
                return (((cpfDigits.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) * 10) % 11) % 10);
            };
            return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
        }, "Digite um cpf válido."),
    })
);

export {
    validationSchema
}