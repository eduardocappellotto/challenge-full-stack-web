# Comentários sobre o Projeto

## Decisão da Arquitetura Utilizada

A arquitetura escolhida para o projeto foi baseada em princípios de Domain-Driven Design (DDD) no backend, utilizando Nest.js com TypeScript. No frontend, optamos por utilizar Vue.js 3 com Vuetify 3, aproveitando os benefícios do script setup e do sistema de tipagem do TypeScript.

## Lista de Bibliotecas de Terceiros Utilizadas

### Frontend:

- Vue.js 3
- Vuetify 3
- Vee-validate
- Zod
- Pinia
- Vue Router

### Backend:

- Nest.js
- TypeScript
- TypeORM
- Class-validator
- JWT (para autenticação)
- PostgreSQL (banco de dados)

## O Que Você Melhoraria Se Tivesse Mais Tempo

Se tivéssemos mais tempo, algumas melhorias que poderiam ser implementadas incluem:

- Implementação de testes E2E no frontend e no backend para garantir a qualidade do código e cobrir todos os cenários de uso.
- Refatoração da lógica de autenticação no frontend e no backend para torná-la mais robusta e abordar todos os casos possíveis.
- Implementação de ordenação das colunas da tabela via servidor.
- Utilização de um banco de dados de testes para testar a camada de repositório no backend.
- Criação de testes de integração no backend para verificar a interação entre os diferentes componentes do sistema.
- Falta de testes E2E tanto no frontend quanto no backend para garantir a cobertura completa dos cenários de uso.
- Lógica de autenticação no backend que pode ser melhorada para lidar com casos mais complexos.

## Requisitos Obrigatórios Que Não Foram Entregues

Todos os requisitos obrigatórios foram entregues tanto no frontend quanto no backend.

## Detalhes da Aplicação

O projeto consiste em um sistema de gerenciamento de estudantes, com um frontend Vue.js 3 e um backend Nest.js. No frontend, são utilizados recursos como layout e páginas baseados em arquivos, validação de formulários com Vee-validate e Zod, gerenciamento de estado com Pinia, e roteamento com Vue Router. No backend, seguimos a arquitetura DDD com Nest.js, utilizando TypeScript, TypeORM para acesso ao banco de dados PostgreSQL, validação de entidades com Class-validator, e autenticação JWT para controle de acesso.

Segue uma visão geral da arquitetura do backend:

- **Módulos**: Cada recurso da aplicação é encapsulado em um módulo, com suas próprias rotas, controladores, serviços e repositórios.
- **Controladores**: Responsáveis por receber requisições HTTP, validar dados de entrada e chamar os serviços apropriados.
- **Serviços**: Contêm a lógica de negócio da aplicação, como manipulação de dados, validações e regras de negócio.
- **Repositórios**: Responsáveis por interagir com o banco de dados, realizando operações de leitura e escrita de dados.

A aplicação inclui um CRUD de usuários para autenticação com JWT, bem como um CRUD de estudantes, que representa o recurso principal da aplicação. Todos os requisitos obrigatórios foram concluídos no frontend e no backend, mas ainda há espaço para melhorias em termos de testes, lógica de autenticação e robustez do sistema.
