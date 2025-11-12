# Configuração de Secrets para GitHub Actions → Vercel Deploy

Para que o workflow funcione, você precisa configurar os seguintes secrets no GitHub:

## Secrets Necessários

1. **VERCEL_TOKEN**
   - Acesse: https://vercel.com/account/tokens
   - Crie um novo token
   - Copie e adicione como secret no GitHub

2. **VERCEL_ORG_ID**
   - Valor: `team_gHQ42vMAeNhbOkmRWomtReQd`
   - Este é o ID da sua organização/team na Vercel

3. **VERCEL_PROJECT_ID**
   - Valor: `prj_ua3SCADTqj1HjXZc6tWoEQw4Hm95`
   - Este é o ID do projeto na Vercel

## Como Adicionar Secrets no GitHub

1. Acesse: https://github.com/8888Codex/inbound-to-sales/settings/secrets/actions
2. Clique em "New repository secret"
3. Adicione cada um dos secrets acima

## Alternativa: Usar Integração Nativa da Vercel

Se preferir, você pode usar a integração nativa da Vercel com GitHub, que não requer secrets:
- A integração automática da Vercel já está configurada
- Ela deve fazer deploy automaticamente quando detectar novos commits
- O problema pode ser que ela está esperando o GitHub Actions passar primeiro

