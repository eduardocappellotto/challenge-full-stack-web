import { defineStore } from 'pinia';

interface SnackbarState {
    message: string;
    color: string;
    timeout?: number;
    active?: boolean;
}

export const useSnackbarStore = defineStore('snackbar', {
    state: (): SnackbarState => ({
        message: '',
        color: '',
        timeout: 6000,
        active: false,
    }),
    actions: {
        show({ message, color = 'info', timeout = 6000 }: SnackbarState) {
            this.message = message;
            this.color = color;
            this.timeout = timeout;
            this.active = true;
            setTimeout(() => {
                this.active = false;
            }, this.timeout);
        },
    },
});
