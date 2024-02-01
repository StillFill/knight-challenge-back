# knight-challenge-back

## Aplicação

### Pre-requisitos

- Node (rodar local)
- Docker (rodar containers - aplicação e mongoDB)

## Testes

- Teste unitários (npm run test)

## Endpoints

- GET /knights - Busca cavalheiros
- GET /knights?filter=heroes - Busca herois
- GET /knights/:id - Busca único cavalheiro
- POST /knights - Cadastra cavalheiros
- PUT /knights/nickname/:id - Atualiza apelido cavalheiro
- DELETE /knights - torna cavalheiro heroi (remove - soft delete)
