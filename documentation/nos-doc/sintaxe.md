# SINTAXE

## Sintaxe de Execução 🚀️

O código **{Nos}** pode ser executado atravês da Linha de Comando de {Nos} [Nos-CLI](http://www.nos.luk3d.com/nos-cli).

Crie um arquivo com o nome `teste.nos` e coloque o código a baixo nele.

```Javascript

int n1;
int n2;
text entrada;
entrada = leia("Informe o primeiro valor: ");
n1 = paraInt(entrada);

entrada = leia("Informe o segundo valor: ");
n2 = paraInt(entrada);

mostre("O resultado da soma de", n1,"e",n2,"é:", (n1+n2));


```

Em seguida, abra a Linha de Comandos (cmd) aportando para o diretório onde o arquivo `teste.nos` se encontra

> Ex:
> C:/users/nos/documentos/pasta_do_projecto

Em seguida execute o comando `nos`. Este comando irá inicializar o **nos-cli**. Feito isso digite o comando  `nos->teste.nos`
O comando a cima, informa para o **nos-cli** que pretendemos apenas rodar o código.

Suponhamos que o utilizador entre com os valores 2 e 5, respectivamente. Quando o código a cima for compilado e executado, irá reproduzir o seguinte resultado:

> O resultado da soma de 2 e 5 é: 7

## Estrutura de um arquivo .nos

Diferente de alguma linguagens de programação, nós não possue restrições na organização do código, mas existem algumas regras de lógica que devem ser levadas em consideração.

## VARIÁVEIS:

### Declaração

Em Nós, as variáveis são declaradas da seguinte forma:

```javascript
[TIPO] [NOME]
```

Onde `[TIPO]` é o [Tipo de dado](http://www.nos.luk3d.com/tipo_de_dados) e o `[NOME]` é o identificador desta variável, ou seja, o nome desta variável.

### Atribuição de valores

uma vez declarada a variável a atrabuição do valor pode ser feito em qualquer parte do código, desde que seja depois da sua declaração.

A sintaxe de atribuição de valor é a seguinte:

```javascript
[VARIAVEL] [OPERADOR_DE_ATRIBUICAO] [VALOR]
```

Onde `[VARIAVEL]` é o identificador ou nome da variável, o `[OPERADOR_DE_ATRIBUICAO]` é um [Operador de Atribuição](http://www.nos.luk3d.com/operadores#atribuição) e o `[VALOR]` é o valor a ser atribuido à essa variável.

## FUNÇÕES
