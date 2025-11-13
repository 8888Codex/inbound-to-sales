# 📊 Guia de Tracking e Analytics

## Sistema de Analytics Implementado

Este projeto possui um sistema completo de tracking e analytics que captura automaticamente dados estratégicos de visitantes e leads.

---

## 🎯 Eventos Capturados Automaticamente

### 1. **Visitas na Página** ✅
- **Quando:** Assim que o usuário entra no site
- **Dados capturados:**
  - ID único da visita
  - Session ID
  - Dispositivo (mobile/desktop/tablet)
  - Navegador (Chrome, Safari, Firefox, etc.)
  - Sistema operacional
  - Localização geográfica (cidade, estado, país)
  - Horário de acesso completo
  - Tempo na página (atualizado a cada 10s)
- **Arquivo:** `src/hooks/usePageTracking.ts`
- **Função:** `trackPageVisit()`

### 2. **Scroll da Página** ✅
- **Quando:** Usuário faz scroll na página
- **Milestones rastreados:**
  - 25% da página
  - 50% da página
  - 75% da página
  - 100% da página (final)
- **Arquivo:** `src/utils/eventTracking.ts`
- **Função:** `trackScrollMilestone()`

### 3. **Cliques em CTAs (Call-to-Actions)** ✅
- **Quando:** Usuário clica em qualquer botão de "Garantir Vaga"
- **CTAs rastreados:**
  - CTA do Hero (topo da página)
  - CTA da seção de Benefícios
  - CTA da seção de Urgência
  - CTA da seção de Audiência
  - CTA Final
  - Floating CTA (botão flutuante)
- **Dados capturados:**
  - Nome do CTA
  - Localização na página
  - Timestamp
- **Arquivo:** `src/utils/eventTracking.ts`
- **Função:** `trackCTAClick()`

### 4. **Início de Formulário** ✅
- **Quando:** Usuário preenche o primeiro campo do formulário
- **Dados capturados:**
  - Tempo desde a visita até iniciar formulário
  - Session ID
  - Timestamp
- **Arquivo:** `src/components/WebinarForm.tsx`
- **Função:** `trackFormStart()`

### 5. **Conclusão de Cadastro** ✅
- **Quando:** Usuário submete o formulário com sucesso
- **Dados capturados:**
  - Nome completo
  - Email profissional
  - Empresa
  - WhatsApp
  - **Gênero** (Masculino/Feminino/Outro/Não informar)
  - **Idade** (validado 18-120 anos)
  - CRM utilizado
  - Quantidade de leads/mês
  - Localização completa
  - Dispositivo e navegador
  - Horário de conclusão
  - Tempo total até completar cadastro
- **Arquivo:** `src/components/WebinarForm.tsx`
- **Função:** `trackFormCompletion()`

---

## 💾 Armazenamento de Dados

### LocalStorage Keys:
- `webinar_analytics` - Dados principais de analytics
- `webinar_events` - Eventos de interação (CTAs, scroll)
- `webinar_session_id` - ID da sessão atual (sessionStorage)
- `visitor_location` - Cache de geolocalização (24h)

### Retenção:
- **90 dias** de histórico
- Limpeza automática de dados antigos
- Limite de 1.000 eventos de interação

---

## 📈 Dashboard Administrativo

### Acesso:
`/admin` (requer senha)

### Métricas Disponíveis:

#### Cards Principais:
1. Total de Visitas
2. Taxa de Conversão
3. Formulários Abandonados
4. Tempo Médio na Página

#### Métricas Adicionais:
5. Dispositivo Mais Usado
6. Localização Principal
7. Total de Cadastros
8. Tempo até Iniciar Formulário
9. Tempo até Completar Cadastro
10. Formulários Iniciados

#### Gráficos Interativos (8 tipos):
1. **Área:** Visitas ao longo do tempo
2. **Barras:** Cadastros vs Abandonos
3. **Pizza:** Distribuição por dispositivo
4. **Barras:** Top 10 localizações
5. **Área:** Acessos por horário do dia
6. **Barras:** Acessos por dia da semana
7. **Pizza:** Distribuição por gênero
8. **Barras:** Distribuição por faixa etária

#### Tabela Detalhada de Leads:
- Data/Hora do cadastro
- Localização (cidade, estado)
- Dispositivo utilizado
- Gênero
- Idade
- Tempo até completar cadastro
- Busca em tempo real
- Paginação

### Períodos de Visualização:
- **Dia:** Dia atual (00h até agora)
- **Semana:** Últimos 7 dias
- **Mês:** Últimos 30 dias

---

## 🔧 Ferramentas de Diagnóstico

### 1. Página de Teste de Tracking
**URL:** `/test-tracking.html`
- Visualiza todos os dados em tempo real
- Auto-refresh a cada 5 segundos
- Exporta dados em JSON
- Mostra visitas, eventos e cadastros

### 2. Página de Limpeza de Dados
**URL:** `/clear-data.html`
- Limpa todos os dados de analytics
- Útil para testes
- Mostra tamanho atual dos dados

---

## 🚀 Como Testar

### Teste Completo do Sistema:

1. **Abra a página principal:** `/`
   - ✅ Verifique no console: "📊 Page visit tracked"
   - ✅ Verifique no console: Dados de dispositivo e localização

2. **Faça scroll na página:**
   - ✅ Verifique no console: "📜 Scroll 25% tracked"
   - ✅ Continue scrollando e veja milestones 50%, 75%, 100%

3. **Clique em um CTA "Garantir Vaga":**
   - ✅ Verifique no console: "🎯 CTA Click tracked"
   - ✅ Formulário deve aparecer/scroll

4. **Preencha o formulário:**
   - ✅ Ao preencher primeiro campo, veja: "Form start tracked"
   - ✅ Ao submeter, veja: "Form completion tracked"

5. **Acesse o dashboard:** `/admin`
   - ✅ Veja todas as métricas atualizadas
   - ✅ Veja os gráficos com dados
   - ✅ Veja sua visita na tabela de leads

6. **Acesse o teste:** `/test-tracking.html`
   - ✅ Veja todos os dados capturados
   - ✅ Acompanhe em tempo real

---

## 📦 Arquivos do Sistema

### Core:
- `src/utils/analytics.ts` - Sistema principal de tracking
- `src/utils/analyticsData.ts` - Processamento e agregação de dados
- `src/utils/eventTracking.ts` - Tracking de eventos de interação
- `src/utils/deviceDetection.ts` - Detecção de dispositivo
- `src/utils/geolocation.ts` - Geolocalização por IP

### Hooks:
- `src/hooks/usePageTracking.ts` - Hook de tracking de página

### Components:
- `src/components/admin/AnalyticsDashboard.tsx` - Dashboard administrativo
- `src/components/WebinarForm.tsx` - Formulário com tracking integrado

### Páginas de Teste:
- `public/test-tracking.html` - Teste de tracking em tempo real
- `public/clear-data.html` - Limpeza de dados

---

## 🎨 Design

Dashboard com **design estilo Apple:**
- ✨ Glassmorphism nos cards
- 🎨 Gradientes sutis e harmoniosos
- 🔄 Animações suaves (fade-in, scale, hover)
- 📐 Tipografia elegante com hierarquia clara
- 🌈 Cores temáticas por métrica
- 💫 Backdrop blur e transparências
- 🎯 Espaçamento generoso

---

## ⚡ Performance

- ✅ Dados armazenados localmente (sem servidor)
- ✅ Limpeza automática de dados antigos
- ✅ Throttling em eventos de scroll
- ✅ Proteção contra arrays vazios
- ✅ Cálculos otimizados
- ✅ Limite de 1.000 eventos de interação

---

## 🔒 Privacidade

- Dados armazenados apenas no navegador do usuário
- Nenhum dado sensível é exposto
- Geolocalização baseada em IP (não GPS)
- Usuário pode limpar dados a qualquer momento
- Conformidade com LGPD

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador (F12)
2. Acesse `/test-tracking.html` para diagnóstico
3. Use `/clear-data.html` para limpar dados
4. Verifique este guia para referência

---

**Última atualização:** 13/11/2024
**Versão:** 2.0

