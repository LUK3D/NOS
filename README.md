# {NOS}

NOS (Nós), é uma linguagem de programação escrita em javascript, baseada no Python e desenvolvida pela [LUK3D](http://www.luk3d.com)

>O projecto encontra-se em desenvolvimento e não temos uma versão de produção no momento.

## Exemplo de código escrito em {NOS}
```JavaScript

var nome;
texto sobrenome;
int idade;
bool sexo; //true para masculino


nome = leia();

mostre("o seu nome e " ,  nome);

int n1;
int n2;

mostre("Informe o primeiro Numero");
n1 = leia();
mostre("Informe o Segundo Numero");
n2 = leia();

n1 = toInt(n1);
n2 = toInt(n2);
mostre("O resultado da some e " , n1+n2);

```


## Como Usar?

Para ver a versão atual do **{NOS}** em funcionamento, basta fazer o download do código, abrir o arquivo index.html num navegador e executar o seguinte comando:
`
console.dir(NOS.Transpile(code))
`
>{NOS} não é uma linguagem que é executada no navegador, apenas o seu transpilador (conversor) é que foi escrito em js podendo ser executado num navegador ou no ambiente nodejs. Ela é multiplataforma como seu pai (Python) e pode ser executado em qualquer abiente que tenha suporte ao python. 

### TODO LIST

|TAREFA| DESCRIÇÃO| SATUS |
|------|----------|-------|
|Documentação| Criar o website oficial para a documentação do {NOS} e para a comunidade poder submeter projectos feitos com ela assim como reportar bug ou pedir alguma funcionalidade nova  | Em Curso |
|Tipos de dados primitivos (Inteiro, Real, Boleano e texto)| Suportar a declaração de variáveis do tipo primitivo | Em Curso |
|Suporte a funcoes | Adicionar suporte de funções (blocos de códigos) e as suas invocações|Em Curso|
|Constantes da matemática| Criar constantes comuns da matemática (Euler's number, PI, square root of 2, square root of 1/2, natural logarithm of 2, natural logarithm of 10, base 2 logarithm of E, base 10 logarithm of E)|


