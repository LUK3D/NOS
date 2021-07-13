
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