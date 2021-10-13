# ![nos-logo](logo.png)

## Seja bem-vindo ao projecto {NOS}

{Nos} (Nós), é uma linguagem de programação escrita em javascript, baseada no Python e desenvolvida pela [LUK3D](http://www.luk3d.com).

O seu foco principal consiste em facilitar o processo de aprendizagem no ramo da programação, ao invés de se usar um pseodocódigo (muito limitado), com o {Nos} você cria programas em seu idioma de preferência que podem ser compilados enquanto aprende a lógica de programação e os comandos da linguagem.

A sua IDE permite ao programador escolher entre programação Visual (Diagramas de Fluxo) ou Escrita.

O presente repositório está estruturado da seguinte forma:

## Transpilator

{NOS} é uma linguagem traduzida e compilada, em outras palavras TRASNPILADA, neste diretório, encontram-se todos os códigos responsável por analizar e traduzir o código `.nos` para `.py`.

Caso você tenha domínio de Javascript ou Typescript e queira contribui, é aqui onde você deve se dirigir.

## Compiler

Aqui você encontra todo o código do compilador que tem a função de transformar o código {NOS} já traduzido em Python, para um programa executável fora do ambiente de desenvolvimento.

Se você tem domínio de Python e quer de alguma forma contribuir, é aqui onde você deve se dirigir.

## IExec-nos (Interface Execução NOS)

Este é o directório onde contem toda a lógica do nos-cli.

É uma pequena aplicação de console (console aplication) que possibilita ao utilizador executar processos relacionados a linguagem NÓS.

Desta forma o programador pode usar a linguagem mesmo fora do ambiente nós.

## SDK (Software Development Kit)

É neste directório onde você encontra tudo acima descrito,  já organizado para os programadores {NOS} começarem a "Codar".

Caso queira apenas programar em {NOS}, baixe o SDK siga os passos e estarás pronto para começar.

> O projecto encontra-se em desenvolvimento e não temos uma versão de produção no momento!

## Exemplo de código escrito em {NOS}

```JavaScript
inteiro n1;
inteiro n2;

n1 = paraInt(leia("Informe o primeiro valor: "));
n2 = paraInt(leia("Informe o segundo valor: "));

mostre("O resultado da soma de ", n1, "e", n2, "é:", (n1+n2));
```

## NOS-IDE

Esta é a IDE oficial de {NOS}, possui todas as ferramentas necessárias para se programar em `.nos`. Caso seja um programador menos experiente com ambiente de linha de comandos, esta é a solução ideal para você.

**Como Usar?**

- Baixe a versão atualizada em [NOS-IDE](https://github.com/LUK3D-Angola/Nos_IDE)
  - Deve ter o [Nodejs](https://nodejs.org/en/download/) e [Python](https://www.python.org/downloads/) de preferência as versões recentes, Instaladas em sua máquina.
- No terminal de comandos (cmd) navegue até a pasta do projecto e execute os seguintes comandos:
  - `npm install`
  - `npm run electron:serve`

> {Nos} não é uma linguagem que é executada no navegador, apenas o seu transpilador (conversor) é que foi escrito em javascript podendo ser executado num navegador ou no ambiente nodejs. Ela é multiplataforma como seu pai (Python) e pode ser executado em qualquer abiente que tenha suporte ao python.

**Veja mais em [{Nos} Introdução](https://www.nos.luk3d.com/introduction.html)**

# COMPILADOR DE NOS

Seja bem-vindo caro dev.
para rodar um script em nós, basta executar o arquivo `compiler.luk.v1.0.py` e executr o comando: 
```
run caminho/absoluto/nome_do_arquivo.nos
```


---

&copy; LUK3D-Angola
