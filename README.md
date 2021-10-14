# ![nos-logo](img/logo.png)

## Seja bem-vindo ao projecto {NOS}

{Nos} (Nós), é uma linguagem de programação escrita em javascript, baseada no Python e desenvolvida pela [LUK3D](http://www.luk3d.com).

O seu foco principal consiste em facilitar o processo de aprendizagem no ramo da programação, ao invés de se usar um pseodocódigo (muito limitado), com o {Nos} você cria programas em seu idioma de preferência que podem ser compilados enquanto aprende a lógica de programação e os comandos da linguagem.

A sua IDE permite ao programador escolher entre programação Visual (Diagramas de Fluxo) ou Escrita.

O presente repositório está estruturado da seguinte forma:

### IExec (Interface Execução `CLI + Compilador + Debugger`)

```txt
Este é o directório onde contem toda a lógica de execução e compilação do NOS.

É uma pequena aplicação de console (console aplication) que possibilita ao utilizador executar processos relacionados a linguagem NÓS.

E tambem contem o código do compilador que tem a função de traduzir o código {NOS} em Python, e também compilar para um programa executável fora do ambiente de desenvolvimento.
```

### SDK (Software Development Kit)

```txt
É neste directório onde você encontra tudo acima descrito,
já organizado para os programadores {NOS} começarem a "Codar".

Caso queira apenas programar em {NOS},
baixe o SDK siga os passos e estarás pronto para começar.
```

> ***O projecto encontra-se em desenvolvimento e não temos uma versão de produção no momento!***

---

## Exemplo de código escrito em {NOS}

```javascript
inteiro n1;
inteiro n2;

n1 = paraInt(leia("Informe o primeiro valor: "));
n2 = paraInt(leia("Informe o segundo valor: "));

mostre("O resultado da soma de ", n1, "e", n2, "é:", (n1+n2));
```

<!-- - [x] Write the press release
- [ ] Update the website
- [ ] Contact the media -->

## [NOS-IDE](https://github.com/LUK3D-Angola/Nos_IDE 'repositorio oficial da IDE')

```txt
Esta é a IDE oficial de {NOS},
possui todas as ferramentas necessárias para se programar em `.nos`.

Caso seja um programador menos experiente com ambiente de linha de comandos,
esta é a solução ideal para você aprender e dominar o NOS.
```

**Como Usar?**

- Baixe a versão atualizada no repositorio oficial da [NOS-IDE](https://github.com/LUK3D-Angola/Nos_IDE)
- Dependencias:
  - Deve ter o [Nodejs](https://nodejs.org/en/download/) e [Python](https://www.python.org/downloads/) de preferência as versões recentes, Instaladas em sua máquina.
- No terminal de comandos (cmd) navegue até a pasta do projecto e execute os seguintes comandos:
  - `npm install`
  - `npm run electron:serve`

> ***{Nos} não é uma linguagem que é executada no navegador, apenas o seu transpilador (conversor) é que foi escrito em javascript podendo ser executado num navegador ou no ambiente nodejs. Ela é multiplataforma como seu pai (Python) e pode ser executado em qualquer abiente que tenha suporte ao python.***

**Veja mais em [{Nos} Introdução](https://www.nos.luk3d.com/introduction.html)**

## COMPILADOR NOS.py

```txt
Seja bem-vindo caro dev.
Para executar um script `.nos`,
basta executar o script `compiler/compilador.py`
e executar o comando:
```

```sh
run localizacao/do/script.nos
```

---

&copy; LUK3D-Angola
