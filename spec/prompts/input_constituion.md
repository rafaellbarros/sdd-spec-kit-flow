Constituição do repositório (Angular):

1) Arquitetura e responsabilidades
- Componentes são standalone por padrão (não explicitar o standalone: true);
- Componentes devem ter suas partes .ts, .css e .html em arquivos separados (não usar inline);
- Separar UI (presentational/dumb) de orquestração (container/smart);
- Dumbs recebem dados via input() e emitem eventos via output(), sem lógica de negócio;
- Dumbs utilizam OnPush e não têm dependências externas (services, state, etc);
- Dumbs ficam na pasta `<nome da feature>/ui` e smarts em `<nome da feature>/feature`;
- Smarts injetam services via inject() e lidam com estado, efeitos e lógica de negócio;
- Componentes não fazem HTTP direto; acesso externo fica em services;
- Services e modelos de dados ficam em `<nome da feature>/data`.

2) Estado e reatividade
- Estado deve ser explícito e simples (loading/erro/sucesso);
- Priorize Signals mas utilize RxJS nas chamadas assíncronas (HTTP, timers, etc);
- Evitar "mágicas" que escondem fluxo (efeitos complexos sem necessidade).

3) Qualidade e verificabilidade
- Toda feature com lógica de dados deve ter testes mínimos (services e smarts);
- Bugs corrigidos devem vir com teste de regressão (primeiro falha, depois passa);
- CI deve rodar testes em modo headless e falhar se quebrar.

4) Acessibilidade e UX básica
- Estados de loading/erro devem ser visíveis e textuais;
- Mensagens de erro devem ser claras e acionáveis;
- Botões e interações devem ter textos claros, bom constraste e foco/teclado funcionando.

5) Assets e UI base
- Assets públicos devem ficar em /public;
- Tipografia e estilos globais devem ser definidos em um ponto único (index.html / styles globais);
- Não adicionar novas fontes/estilos globais.

6) Escopo e manutenção
- Mudou comportamento: atualizar spec/plan da feature correspondente;
- Mudou apenas implementação sem mudar comportamento: manter spec intacta (mas atualizar plan se necessário);
- PRs devem ser pequenos, rastreáveis e com checklist de validação (test/build/run).
