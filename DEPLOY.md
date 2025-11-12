# 🚀 Guia de Deploy na Vercel

## Status Atual
✅ **Código commitado e enviado para GitHub**
- Repositório: `https://github.com/8888Codex/inbound-to-sales`
- Branch: `main`
- Commit: `f18a9fe`

## Opção 1: Deploy via Interface Web (Recomendado)

### Passo a Passo:

1. **Acesse a Vercel**
   - Vá para: https://vercel.com
   - Faça login com sua conta

2. **Importe o Projeto**
   - Clique em "Add New..." → "Project"
   - Selecione "Import Git Repository"
   - Escolha o repositório: `8888Codex/inbound-to-sales`

3. **Configuração Automática**
   - A Vercel detectará automaticamente:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - O arquivo `vercel.json` já está configurado

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build (aproximadamente 1-2 minutos)
   - Pronto! Seu site estará no ar

## Opção 2: Deploy via CLI

Se preferir usar o CLI:

```bash
# 1. Instalar Vercel CLI (já instalado)
npm install -g vercel

# 2. Fazer login
npx vercel login

# 3. Deploy em produção
npx vercel --prod
```

## Configurações do Projeto

- **Framework**: Vite + React
- **Node Version**: 18.x ou superior
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Variáveis de Ambiente

Nenhuma variável de ambiente necessária no momento.

## URLs após Deploy

Após o deploy, você receberá:
- **Production URL**: `https://inbound-to-sales.vercel.app`
- **Preview URLs**: Para cada commit/PR

## Próximos Passos

1. ✅ Código no GitHub
2. ⏳ Conectar na Vercel (via web ou CLI)
3. ⏳ Deploy automático
4. ⏳ Configurar domínio customizado (opcional)

## Suporte

Se encontrar problemas:
- Verifique os logs de build na Vercel
- Confirme que o repositório está público ou você tem acesso
- Verifique se o Node.js está na versão correta

