
# Introdução

## O que é {Nos}

{NOS} (Nós), é uma linguagem de programação opensource escrita em javascript, baseada no Python e desenvolvida pela [LUK3D](http://www.luk3d.com) 

O seu foco principal consiste em facilitar o processo de aprendizagem no ramo da programação. Ao invez de se usar um pseodocódigo (muito limitado),
com o {Nos} você cria programas em seu idioma de preferência que podem ser compilados enquanto aprende a lógica de programação e os comandos da linguagem. A sua IDE permite ao programador escolher entre programação Visual (Diagramas de Fluxo) ou Escrita. 


## Exemplo de código em {Nos}
```JavaScript

int n1;
int n2;
texto entrada;

mostre("Informe o primeiro Numero");
entrada = leia();
n1 = toInt(entrada);

mostre("Informe o Segundo Numero");
entrada = leia();
n2 = toInt(n2);

mostre("O resultado da some  de ", n1, "+",n2 ,"é: " , n1+n2);

```
Neste exemplo demostramos como seria um algoritmo que lê dois valores `(n1 e n2)` com o comando `leia()` , em seguida converte os valores lidos para inteiro e no final mostra na tela com o comando `mostre` o resultado da soma dos dois valores.

## Como funciona

### 
Tudo começa com a entrada do código do utilizador (nos-code).
quando o compilador de nós recebe o código, realiza uma análise para verificar a sintaxe e identificar as palavras chaves. Caso o mosmo encontro algum erro, retorna uma mensagem com a informação do erro encontrado.

Caso o código não tenha nada de errado, então o compilado passa para a fase seguinte que é a tradução. O Código nós é traduzido para Python e o seu interpretador é usado para executar o código agora traduzido.


O Compilador de {Nos} foi totalmente escrito em javascript, ela tem as seguintes funções:
* Lexing - divida o texto do programa em "tokens". Os tokens são as "palavras" da linguagem de programação, como identificadores (palavras-chave, nomes de variáveis, nomes de funções, etc.) ou operadores (=, *, &, etc.).


* Análise - converta a sequência de tokens em uma árvore de análise, que é uma estrutura de dados que representa várias construções de linguagem: declarações de tipo, declarações de variáveis, definições de funções, loops, condicionais, expressões etc.


* Otimização - avalie expressões constantes, otimize variáveis ​​não utilizadas ou códigos inacessíveis, desenrole loops, se possível, etc.

* Traduza a árvore de análise em instruções da máquina (ou código de byte da JVM).