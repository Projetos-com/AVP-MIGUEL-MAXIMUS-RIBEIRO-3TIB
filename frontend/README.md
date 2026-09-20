# Frontend de autenticação

Este frontend implementa login, armazenamento do JWT, consulta de perfil protegido e logout. A proteção visual da rota melhora a navegação, mas a validação real continua sendo feita pelo middleware do backend.

## Tecnologias e estrutura

O frontend usa React, Vite, React Router DOM, Axios, Tailwind CSS v4 e JavaScript. Não usa TypeScript, Redux, Context API, bibliotecas de UI, cookies ou refresh token.

```text
src/
  components/
    ProtectedRoute.jsx
  pages/
    Login.jsx
    ProtectedPage.jsx
  services/
    api.js
    auth.js
  App.jsx
  main.jsx
  index.css
.env.example
index.html
package.json
vite.config.js
README.md
```

`src/main.jsx` inicia o React e o `BrowserRouter`. `src/App.jsx` define as rotas. `src/services/api.js` cria a instância `api` do Axios com a URL base do backend. `src/services/auth.js` concentra as funções didáticas para o token.

## Instalação e execução

Instale o Node.js compatível com a versão do Vite declarada em `package.json`. Na raiz do projeto, execute:

```bash
npm install
cp .env.example .env
npm run dev
```

No PowerShell, o equivalente a `cp .env.example .env` é `Copy-Item .env.example .env`. O arquivo `.env` deve conter:

```env
VITE_API_URL=http://localhost:3000
```

O Vite lê variáveis iniciadas por `VITE_` e as disponibiliza em `import.meta.env`. Reinicie `npm run dev` após editar o `.env`. Rode também o backend Node.js/Express em `http://localhost:3000` antes de testar as integrações em aula. Se o navegador bloquear uma chamada entre as portas do frontend e do backend, confira a configuração de CORS no backend.

## Tailwind CSS v4

O Tailwind v4 usa os pacotes `tailwindcss` e `@tailwindcss/vite`. Para instalá-los em um projeto Vite, o comando é:

```bash
npm install tailwindcss @tailwindcss/vite
```

Neste template, ambos já estão declarados em `package.json` e são instalados pelo `npm install` inicial. `vite.config.js` registra os plugins `react()` e `tailwindcss()`. `src/index.css` contém `@import "tailwindcss";`, e esse CSS é importado por `src/main.jsx`. As classes utilitárias são usadas diretamente no JSX para fundo cinza claro, cards brancos, botões azuis, campos com borda, mensagens vermelhas ou verdes e layout responsivo básico.

No Tailwind v3, era comum usar três diretivas separadas (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) e arquivos de configuração JavaScript/PostCSS. Na configuração atual do v4 com Vite, usamos o plugin oficial e um único `@import "tailwindcss";`. Por isso, este projeto não precisa de `tailwind.config.js` nem `postcss.config.js`. Consulte a [documentação oficial do Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite) para conferir a configuração.

## Páginas e funções

| Arquivo | Responsabilidade |
| --- | --- | --- |
| `pages/Login.jsx` | Valida credenciais, salva o JWT e navega para `/perfil`. |
| `pages/ProtectedPage.jsx` | Consulta `/perfil` com Bearer Token e implementa logout. |
| `components/ProtectedRoute.jsx` | Redireciona para login quando não há token salvo. |
| `services/auth.js` | Gerencia o JWT no `localStorage`. |

## Fluxo da aplicação

1. Usuário acessa `/login` e informa email e senha.
2. Frontend envia as credenciais para `POST /login` usando Axios.
3. Backend valida o login e retorna um token JWT.
4. Frontend salva o token no `localStorage` com a chave `auth_token`.
5. Usuário é redirecionado para `/perfil`.
6. A página protegida envia o token no header `Authorization: Bearer TOKEN_AQUI`.
7. Backend valida o token no middleware e retorna os dados do usuário.
8. Ao sair, o token é removido e o usuário volta para `/login`.

Guardar e enviar o token no frontend permite controlar a navegação, mas isso não substitui a segurança do backend. `ProtectedRoute` só melhora a experiência de quem usa a aplicação. A proteção real é o middleware do backend, que deve validar o JWT a cada requisição protegida, mesmo se alguém tentar acessar a API diretamente ou burlar o frontend.

Para adaptar ao TCC, a turma pode trocar títulos e cores, criar campos próprios no perfil e mudar `VITE_API_URL` para o endereço da API do projeto. Ao alterar o contrato da API, revisem também os caminhos das rotas, os nomes dos campos e o formato da resposta do login e do perfil.

## Checklist dos alunos

- [ ] Rodei o backend
- [ ] Rodei o frontend
- [ ] Configurei VITE_API_URL
- [ ] Entendi a estrutura do frontend
- [ ] Entendi onde fica a configuração do axios
- [ ] Completei o login no frontend
- [ ] Acessei `/login`
- [ ] Fui redirecionado para `/perfil` após o login
- [ ] Recebi o token do backend
- [ ] Salvei o token no localStorage
- [ ] Completei a página protegida
- [ ] Bloqueei `/perfil` sem token
- [ ] Enviei Authorization: Bearer TOKEN para o backend
- [ ] Recebi os dados do usuário logado
- [ ] Implementei logout
- [ ] Entendi que o frontend apenas guarda e envia o token
- [ ] Entendi que quem valida de verdade é o backend
