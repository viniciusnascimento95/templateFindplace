# Contexto do Projeto para o Frontend: Festfy (MVP)

Você atuará como o desenvolvedor/agente focado no **Frontend** do projeto **Festfy**. O Festfy é uma plataforma (MVP) focada em conectar **Organizadores de Eventos** a **Donos de Espaços/Locais**. 

O Backend já foi estruturado e concluído na sua fundação principal, utilizando **NestJS, Prisma e PostgreSQL**. Agora precisamos construir o Frontend para consumir essas APIs.

Abaixo estão todas as regras de negócio, rotas disponíveis e estruturas de dados que você precisa conhecer para implementar as telas e integrações.

---

## 🔒 1. Autenticação e Regras de Acesso (RBAC)

O sistema utiliza **JWT (JSON Web Token)**. Toda rota protegida precisa receber o header:
`Authorization: Bearer <seu_token_aqui>`

Existem 3 tipos de usuários (Roles) no sistema:
1. **`ORGANIZER`** (Organizador): Pode buscar espaços e enviar pedidos de orçamento/contato.
2. **`VENUE_OWNER`** (Dono de Espaço): Pode cadastrar seus próprios espaços e visualizar os contatos/pedidos recebidos.
3. **`ADMIN`** (Administrador): Pode ver métricas de uso e aprovar/rejeitar espaços recém-cadastrados.

### Rotas de Auth (`/auth`)
- **`POST /auth/register`**: Registra um novo usuário.
  - *Body:* `{ "email": "...", "password": "...", "name": "..." }`
- **`POST /auth/login`**: Realiza o login.
  - *Body:* `{ "email": "...", "password": "..." }`
  - *Response:* Retorna o token JWT.
- **`POST /auth/me`**: Retorna os dados do usuário atual baseado no token.
- **`PUT /auth/:id/change-password`**: Altera a senha do usuário. Requere token.

---

## 🏠 2. Locais e Espaços (`/venues`)

Representa o catálogo de espaços para eventos disponíveis na plataforma.

- **`GET /venues`**: Lista os espaços. Usado pela tela principal de busca dos Organizadores.
- **`GET /venues/:id`**: Retorna os detalhes de um espaço específico, incluindo o endereço completo, imagens vinculadas e dados básicos do dono.
- **`POST /venues`**: Cria um novo espaço. 
  - *Acesso:* Apenas `VENUE_OWNER` (ou `ADMIN`).
  - *Body Esperado:*
    ```json
    {
      "name": "Nome do Espaço",
      "description": "Descrição detalhada do local.",
      "capacity": 200,
      "basePrice": 1500.50,
      "street": "Rua Exemplo, 123",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01000-000",
      "imageUrls": ["https://exemplo.com/img1.jpg", "https://exemplo.com/img2.jpg"]
    }
    ```
  - *Comportamento:* Por padrão, ao ser criado, o `status` do Local entra como `PENDING` (Pendente), aguardando liberação do Admin para aparecer ativamente.

---

## 🤝 3. Interesses e Contatos (`/inquiries`)

Faz a ponte de comunicação entre Organizador e Dono do Espaço.

- **`POST /inquiries`**: O Organizador envia uma mensagem de interesse para o Dono do Espaço.
  - *Acesso:* Apenas `ORGANIZER` (ou `ADMIN`).
  - *Body Esperado:*
    ```json
    {
      "desiredDate": "2026-12-01T00:00:00.000Z",
      "guestCount": 150,
      "message": "Olá, gostaria de saber se há disponibilidade e se aceitam banda ao vivo.",
      "venueId": 1
    }
    ```
- **`GET /inquiries/received`**: Retorna a lista de todas as solicitações que os Locais do usuário logado receberam.
  - *Acesso:* Apenas `VENUE_OWNER` (ou `ADMIN`).
  - *Uso:* Tela de "Inbox" ou "Meus Leads" do Dono do Espaço.
- **`GET /inquiries/sent`**: Retorna a lista de mensagens/interesses enviados pelo usuário logado.
  - *Acesso:* Apenas `ORGANIZER` (ou `ADMIN`).
  - *Uso:* Tela de "Minhas Solicitações" do Organizador.

---

## 🛡️ 4. Backoffice e Administração (`/admin`)

Painel exclusivo para a equipe da Festfy aprovar Locais e ver métricas. **Todas as rotas exigem role `ADMIN`.**

- **`GET /admin/dashboard`**: Retorna contadores gerais (métricas) da plataforma.
  - *Response:* `{ "venues": { "total": 10, "pending": 2 }, "inquiries": { "total": 5 }, "users": { "total": 15 } }`
- **`PATCH /admin/venues/:id/approve`**: Aprova um Local, trocando o status de `PENDING` para `APPROVED`.
- **`PATCH /admin/venues/:id/reject`**: Rejeita um local, trocando o status para `REJECTED`.

---

## 🎯 Missão do Frontend

1. **Configuração Base:** Subir o projeto (React/Next/Expo), configurar o roteador (React Router / Expo Router) e criar um cliente HTTP (como Axios) apontando para a base URL da nossa API. O Axios deve injetar o header de `Authorization` automaticamente caso o usuário esteja logado.
2. **Fluxo de Auth:** Telas de Login, Cadastro e esqueci/trocar senha. Persistir o token no localStorage ou AsyncStorage.
3. **Fluxo do Organizador (`ORGANIZER`):** 
   - Tela Home com listagem estática ou filtrada (`GET /venues`).
   - Tela de Detalhes do Local (`GET /venues/:id`).
   - Modal/Tela de envio de contato (`POST /inquiries`).
   - Minhas Solicitações (`GET /inquiries/sent`).
4. **Fluxo do Dono de Espaço (`VENUE_OWNER`):**
   - Dashboard do Dono com Pedidos Recebidos (`GET /inquiries/received`).
   - Cadastro de Novo Espaço (`POST /venues`).
5. **Fluxo Admin (`ADMIN`):**
   - Dashboard de Aprovação (`GET /admin/dashboard` e listagem manual de reviews).
   - Botões para Aprovar/Rejeitar (`PATCH /admin/...`).

Seu primeiro passo é estruturar e propor o planejamento de divisão dos componentes. Você está pronto?
