# Projeto Postagens

## Descrição
Aplicação de gerenciamento de postagens com frontend em React (Vite + TypeScript + MUI) e backend em .NET 6.

- **Frontend:** React + Vite + MUI + Axios  
- **Backend:** .NET 6 Web API  
- **Testes:** Não foi utilizado testes no front apenas no backend.
 O backend foi testado de forma abrangente com xUnit, e o frontend está integrado a essas APIs testadas.
 Isso garante uma camada funcional de segurança, mesmo antes da implementação de testes unitários no frontend.

O sistema utiliza HTTPS para comunicação segura entre frontend e backend.

---

## Pré-requisitos
- Node.js ≥ 20  
- npm ≥ 9  
- .NET 6 SDK  
- Banco de dados configurado (PostgreSQL)

---

## Instalação

### 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd postagens
2. Instalar dependências do frontend
bash
Copiar código
cd Postagens.Client
npm install
3. Criar o banco de dados
No PostgreSQL, execute:

sql
Copiar código
CREATE DATABASE postagens;
4. Configurar variáveis de ambiente (Rota da API)
No frontend (Postagens.Client/.env):

.env
VITE_BACKEND_API_URL=https://localhost:7225/api (Rota default para api, caso você inicie em outra porta gentileza alterar)
No backend (Postagens.Server/appsettings.json:

json
Copiar código
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=postagens;Username=seu_usuario;Password=sua_senha"
  }
}
5. Rodar as migrations do backend
No terminal, dentro da pasta Postagens.Server:

bash
Copiar código
# restaurar pacotes
dotnet restore

# criar a migration (apenas se houver alterações novas)
dotnet ef migrations add InitialCreate

# aplicar as migrations ao banco
dotnet ef database update
Executando o projeto
Backend
bash
Copiar código
cd Postagens.Server
dotnet run
O backend estará disponível em: https://localhost:7225

Frontend
bash
Copiar código
cd Postagens.Client
npm run dev
O frontend estará disponível em: http://localhost:57762 (ou porta indicada no terminal)

Testes
Backend
bash
Copiar código
cd Postagens.Server
dotnet test
Frontend



Scripts úteis (frontend)
bash
Copiar código
npm run dev      # inicia o frontend
Copiar código
Postagens/
├─ Postagens.Client/   # Frontend React + Vite + MUI
├─ Postagens.Server/   # Backend .NET 6
└─ README.md
