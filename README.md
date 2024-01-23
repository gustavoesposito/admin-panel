Admin Panel: Um Projeto Next.js
Este projeto, um painel de administração elegante e eficiente, é construído sobre a robusta estrutura do Next.js e foi iniciado usando create-next-app, fornecendo uma base sólida para o desenvolvimento web.

Implantação ao Vivo
O Admin Panel está ao vivo, implantado de forma contínua através do Vercel. Experimente em primeira mão aqui: https://admin-panel-ten-steel.vercel.app/.

Primeiros Passos: Configuração e Lançamento
Configuração Inicial
Comece clonando o repositório do projeto para sua máquina local e instalando as dependências necessárias:

Clonar o repositório:
bash
Copy code
git clone https://github.com/gustavoesposito/admin-panel.git
Instalar dependências:
Usando Yarn:

bash
Copy code
yarn install
Ou, usando npm:

bash
Copy code
npm install
Executando o Servidor de Desenvolvimento
Para iniciar o servidor de desenvolvimento e explorar o Admin Panel localmente, execute:

bash
Copy code
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
Navegue até http://localhost:3000 no seu navegador para ver a aplicação em ação. O projeto utiliza next/font para otimização automática e carregamento da fonte Inter, melhorando o apelo visual com uma fonte personalizada do Google.

Login do Usuário
Acesse o Admin Panel usando as seguintes credenciais:

Email: usuario@leans.com.br
Senha: senha123
Pilha Tecnológica
O Admin Panel é criado usando uma pilha moderna e poderosa, garantindo uma aplicação escalável, sustentável e de alto desempenho:

Next.js 14: Para renderização no lado do servidor e geração de sites estáticos.
TypeScript: Para tipagem forte e confiabilidade de código.
Context API: Para gerenciamento de estado em toda a aplicação.
Axios: Para requisições HTTP baseadas em promessas.
SCSS: Para capacidades avançadas de estilização.
Material UI (MUI): Para um conjunto abrangente de ferramentas de UI.
Jest & Testing Library: Para estratégias robustas de teste.
