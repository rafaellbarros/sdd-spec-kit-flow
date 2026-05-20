# 001 — Quote Card (ZenQuotes)

## Objetivo

Exibir uma citação aleatória (texto + autor) e permitir recarregar.

## Requisitos funcionais

RF01. Ao abrir a tela, buscar e exibir uma citação aleatória.
RF02. Deve existir um botão "Refresh" para buscar outra citação.
RF03. Enquanto carrega, exibir estado de loading.
RF04. Em erro, exibir mensagem clara e permitir tentar novamente.

## Requisitos não-funcionais

RNF01. Ter testes automatizados (service + smart component).
RNF02. UI acessível (botão com copy clara, bom contraste, estados visíveis) e responsiva.
RNF03. Código simples e rastreável (sem overengineering).

## Critérios de aceite (testáveis)

CA01. Ao iniciar, mostra loading e depois mostra quote + autor.
CA02. Ao clicar Refresh, volta a loading e troca quote + autor.
CA03. Em erro, mostra mensagem e mantém botão Refresh funcionando.
