# Passo a Passo para Clonar e Configurar o Projeto

## 1. Clonar o Repositório
Execute o seguinte comando para clonar o repositório:
```bash
git clone https://github.com/AlexAbreuGomes/app-senac-aprendizagem.git
```

## 2. Entrar na Subpasta
Navegue para a pasta do projeto:
```bash
cd app-senac-aprendizagem
```
Verifique se a estrutura da pasta está conforme esperado:
```
- app-senac-aprendizagem (pasta principal)
   - app-senac-aprendizagem (subpasta)
```
Se a estrutura for essa, entre na subpasta:
```bash
cd app-senac-aprendizagem
```

## 3. Instalar Dependências
Instale as dependências do projeto usando o comando:
```bash
npm install
```

## 4. Verificar a Branch Atual
Sempre verifique em qual branch você está usando o comando:
```bash
git branch
```

## 5. Atualizar o Repositório Local
Atualize as informações do repositório local com as branches remotas:
```bash
git fetch
```

## 6. Listar Branches Remotas
Liste as branches remotas disponíveis com o comando:
```bash
git branch -r
```
Exemplo de saída esperada:
```
  origin/back
  origin/front
  origin/main
```

## 7. Criar e Alternar para uma Branch Local Baseada em uma Remota
Use o comando a seguir para criar e alternar para uma branch local baseada em uma remota:
```bash
git checkout -b <nome-da-branch> origin/<nome-da-branch-remota>
```
### Exemplo:
Para criar e alternar para a branch `front`, use:
```bash
git checkout -b front origin/front
```

## 8. Criar Sub-Branches
Siga os passos abaixo para criar sub-branches:

1. Entre na branch principal desejada:
   ```bash
   git checkout <nome-da-branch>
   ```

2. Crie uma sub-branch com o seguinte comando:
   ```bash
   git checkout -b <nome-da-sub-branch>
   ```

### Exemplos:
- Para a branch `front`:
  ```bash
  git checkout front
  git checkout -b frontEnd/feature-login
  ```
- Para a branch `back`:
  ```bash
  git checkout back
  git checkout -b backEnd/<nome-do-que-esta-fazendo>
  ```

## 9. Puxar a atualizaçao da main
Siga os passos abaixo para mesclar os arquivos da branch main na sua branch:

isso servirá para manter seu projeto atualizado 

- 1. primeiro check sua branch voce precisa estar main

```bash
git branch 
```
- 2. de um git pull para atualizar localmente seu projeto

```bash
git pull origin main
```
- 3. faça a mudança pra sua branch

```bash
git checkout <nome-da-branch>
git merge main
```

### Exemplos:
- Para a branch `front`:
  ```bash
  git checkout front
  git merge main
  ```


### LEMBRANDO:
```bash
git fetch // rastreia branch's remotas
```

```bash
git branch -r //exibe branch's rastreadas
```

```bash
git checkout -b [nomebranch] origin/[nomebranchremota]
```

### Ex:
```bash
git checkout -b backEnd/frontEnd origin/backEnd/frontEnd
```