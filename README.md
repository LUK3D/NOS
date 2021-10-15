# ![nos-logo](img/logo.png)

## Seja bem-vindo ao projecto {NOS}

{Nos} (Nós), é uma linguagem de programação escrita em javascript, baseada no Python e desenvolvida pela [LUK3D](http://www.luk3d.com).

O seu foco principal consiste em facilitar o processo de aprendizagem no ramo da programação, ao invés de se usar um pseodocódigo (muito limitado), com o {Nos} você cria programas em seu idioma de preferência que podem ser compilados enquanto aprende a lógica de programação e os comandos da linguagem.

A sua IDE permite ao programador escolher entre programação Visual (Diagramas de Fluxo) ou Escrita.

### Compiler

Aqui você encontra todo o código do compilador que tem a função de transformar o código {NOS} já traduzido em Python, para um programa executável fora do ambiente de desenvolvimento.

Se você tem domínio de Python e quer de alguma forma contribuir, é aqui onde você deve se dirigir.

### Exemplo de código escrito em {NOS}

```JavaScript
inteiro n1;
inteiro n2;

n1 = paraInteiro(leia("Informe o primeiro valor: "));
n2 = paraInteiro(leia("Informe o segundo valor: "));

mostre("O resultado da soma de ", n1, "e", n2, "é:", (n1+n2));
```

## COMPILADOR DE NOS

Para executar um script em nós, basta executar o arquivo `compiler.luk.v1.0.py` e executr o comando:

```sh
run caminho/absoluto/nome_do_arquivo.nos
```

## CRIANDO UM EXECUTÁVEL

O nos-cli (Interface de Linha de Comandos de NOS) torna o processo de empacotar (build) o código {NOS} para um executáve muito simples.
Você pode compilar a sua aplicação para Windows, MAC ou LINUX, basta que você esteja a rodar o código num desses ambientes.

Execute o seguinte comando para compilar a aplicação:

```sh
build caminho/absoluto/nome_do_arquivo.nos --name="escreva aqui o nome da aplicação"
```

Para adicionar um icon personalizado para o seu programa, basta colocar um arquivo de icon (.ico) no diretório do projecto. Ou seja, qualquer arquivo com o nome de icon.ico na pasta do projecto, será utilizado como icon do programa.


<!-- - [x] Write the press release
- [ ] Update the website
- [ ] Contact the media -->

## TODO

| TAREFA      | DESCRIÇÃO |
| ----------- | ----------- |
| Importação de módulos | Criar regra de importação de códigos localizados em outros arquivos.       |
|  SDK  |   Compilar e distribuir a versão estável    |

---

&copy; LUK3D-Angola
