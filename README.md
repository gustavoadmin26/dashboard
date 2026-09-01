# Dashboard Pronto

Dashboard de atribuição Meta × Kommo/CRM × WhatsApp, com isolamento por cliente.

## Arquitetura multi-tenant

Cada cliente é uma `organization`. O desenho suporta, por exemplo:

- Cliente A → Meta Business Manager / Ad Account A + Kommo A + WhatsApp A
- Cliente B → Meta Business Manager / Ad Account B + Kommo B + WhatsApp B

O usuário pode pertencer a várias organizações. O cliente ativo é definido pela rota `/app/[organizationId]` e validado contra `organization_members` antes de qualquer consulta operacional.

### Segurança

- RLS habilitado nas tabelas operacionais.
- Consultas do dashboard sempre incluem `organization_id`.
- `organization_members` controla acesso e papéis (`owner`, `admin`, `member`).
- Integrações podem ser alteradas somente por owner/admin.
- Tokens não devem chegar ao browser; credenciais ficam server-side e devem ser armazenadas cifradas.
- A página `/demo` usa números fictícios e não acessa dados do cliente.

## Stack

Next.js + Supabase/Postgres + OpenNext/Cloudflare Workers.

## Ambiente

Copie `.env.example` para `.env.local` e configure:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Os segredos do deploy do Cloudflare são mantidos no GitHub Actions; nunca coloque tokens reais no repositório.

## Rotas

- `/demo` — preview visual
- `/` — entrada/auth e seleção do primeiro workspace
- `/app/[organizationId]` — dashboard isolado por cliente
- `/app/[organizationId]/attribution` — atribuições
- `/app/[organizationId]/campaigns` — campanhas Meta
- `/app/[organizationId]/leads` — leads Kommo
- `/app/[organizationId]/integrations` — fontes e status das conexões

## Próxima camada de integração

1. Provisionar usuários/convites no Supabase Auth.
2. Criar uma `organization` por cliente e seus membros.
3. Cadastrar uma `integration_connection` por fonte/conta.
4. Implementar jobs server-side para Meta e Kommo.
5. Validar payloads reais de CTWA/WhatsApp antes de fechar a atribuição determinística.
