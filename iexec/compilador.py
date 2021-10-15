import json
import os
import re
from pprint import pprint
from sys import argv, exit
from typing import Tuple, List

from builder import BUILDER
from debugger import DBG

# LENDO O DICIONÁRIO COM AS PALAVRAS RESERVADAS DE {NOS}
with open('core/dictionary.json') as f:
    RESERVED = json.load(f)


def save_final_code(code: str):
    """método para salvar o código python gerado em um arquivo"""
    os.makedirs(".temp", exist_ok=True)
    with open(".temp/output.py", "w") as py_file:
        py_file.write(code)
        return "Arquivo gerado em: .temp/output.py"


def indent_code(_times: int):
    """calcular a quantidade de vezes que o código deve ser indentado"""
    return "\t" * _times if _times > 0 else ""


def join_tuple_string(strings_tuple: Tuple) -> str:
    """função que converte tupla em string"""
    return ' '.join(strings_tuple)


def remove_empty_from_list(_list: list) -> list:
    """função que remove valores vazios das listas"""
    return [x for x in _list if x.strip()]


def nos_to_python(_commands: List):
    """método para conversão do código nós para python"""
    script = []
    indentationSteps = 0
    for n_cmd in _commands:
        if len(n_cmd) > 0:
            print("-" * 100)
            code_line = ""
            # Bloco de codigo para traduzir os comandos  que se encontram no dicionário.
            if n_cmd["description"]:
                if n_cmd["description"]["ignore_on_translate"]:
                    continue

            cmd_tmp = n_cmd["original"]
            commands = n_cmd["commands"]
            command = n_cmd["command"]
            replace_pos = n_cmd["translation_origins"]

            final_comands_list = "(".join(replace_pos.split("( (")).split("(")
            final_to_be_replaced = remove_empty_from_list(replace_pos.split("("))
            final_to_replce = []

            for idx, val in enumerate(final_comands_list):
                final_to_replce.append(val.strip().split(" ")[0])

            try:
                idx = 0
                for idx, val in enumerate(final_to_replce):
                    if val:
                        cmd_tmp = commands[idx]["command"].join(final_to_be_replaced[idx].strip().split(val)).join(cmd_tmp.split(val))
                        if re.match("^([aA-z_Z0-9])+( )+([aA-z_Z0-9])+( )+([aA-z_Z0-9])+", cmd_tmp):
                            cmd_tmp = (commands[idx]["command"] + ([x for x in re.split(r'^([aA-z_Z0-9])+( )+([aA-z_Z0-9])+', cmd_tmp.strip()) if len(x) > 1])[0])
            except Exception as _erro:
                print("[ ERRO ]: ", _erro)

            # traduzindo os operadores logicos
            code_line = (indent_code(indentationSteps) + cmd_tmp)
            rex = re.compile(r"(\|\|)|(&&)|((!)[a-zA-Z()].*)")

            for item in rex.findall(code_line):
                try:
                    op = join_tuple_string(item).strip()
                    local_operators = RESERVED[op]
                    if local_operators:
                        code_line = local_operators["command"].join(code_line.split(op))
                except Exception as _erro:
                    print("[ ERRO ]: ", _erro)

            try:
                # Traduzindo termos internos reservados do comando ou da funcao
                for cmd in n_cmd["commands"]:
                    for cmd_op in cmd["internals"]:
                        code_line = cmd_op["command"].join(code_line.split(cmd_op["key"]))
                    try:
                        # Removendo os parenteses dos comandos com esta regra gramatical
                        if cmd["no_parentheses"]:
                            code_line = code_line.replace("(", " ", 1)
                            last_char_index = code_line.rfind(")")
                            code_line = code_line[:last_char_index] + " " + code_line[last_char_index + 1:]
                        elif cmd["type"] == "bloc":
                            print("[ FALHA ]:\n\t", cmd)
                    except Exception as _erro:
                        print("[ ERRO ]: ", _erro)
            except Exception as _erro:
                print("[ ERRO ]: ", _erro)

            # verificando se estamos a entrar ou sair no escopo de uma função.
            if re.match("(.*{)$", code_line):
                indentationSteps += 1
            elif re.match("(.*})$", code_line):
                indentationSteps -= 1
            # removendo o ';' do código
            elif len(code_line) > 0:
                if code_line[-1] == ";":
                    code_line = code_line[:-1]
            else:
                continue

            # Removendo as chaves e qualquer tipo de finalizacao da linha sem suporte.. EX ({, }, {:, (, :),})
            code_line = re.sub(r"(:)|({:)|({)|(:$)", ":", code_line)
            code_line = re.sub(r"(})$", "", code_line)
            # adicionando o comando final a lista
            try:
                code_line += n_cmd["description"]["end"]
            except Exception as _erro:
                print("[ ERRO ]: ", _erro)

            script.append(code_line)
            print(code_line)
            print("-" * 100)

    DBG().debug(f"{script}")
    return "\n".join(script)


def verify_command(_noscode: str):
    """processa o comando e retorna o objecto que o representa no dicionário do {NOS}"""
    tmp_cmd_listados = []
    for operator in RESERVED["attrib_operadores"]["command"]:
        for cmd_in in _noscode.split(operator):
            cmd_in_tmp = cmd_in.strip().split(" ")
            if len(cmd_in_tmp) > 1:
                print("[ OPCOES ]:\n\t", cmd_in_tmp, "".join(re.split(r";$", cmd_in_tmp[len(cmd_in_tmp) - 1])))
                tmp_cmd_listados.append("".join(re.split(r";$", cmd_in_tmp[len(cmd_in_tmp) - 1])))
            elif len(cmd_in_tmp) > 0:
                tmp_cmd_listados.append("".join(re.split(r";$", cmd_in_tmp[0])))
    try:
        tmp_cmd_listados = list(set(tmp_cmd_listados))
        constante = RESERVED[tmp_cmd_listados[0].strip()]
        print("[ CONSTANTE TESTE ]:\n\t", constante)
        if constante:
            print("[ CONSTANTE ]:\n\t", constante)
    except Exception as _erro:
        print("[ ERRO ]: ", _erro)

    cmd_listados = _noscode.split(" ")
    _noscmd = cmd_listados[0] if (len(cmd_listados) > 1) else _noscode
    no_code_split = _noscode.split(_noscmd)

    regex = re.compile(r"([aA-z_Z0-9 ]*((|\()|\(|{ *))")
    formated_command_1 = map(join_tuple_string, regex.findall(_noscode))
    formated_command_1 = " ".join(formated_command_1)[:-1]

    # Pegando apenas palavras e ignorando qualquer caracter especial
    regex2 = re.compile("[A-Za-z_0-9]*")
    formated_command_2 = regex2.findall(formated_command_1)

    # Limpando a lista e deixando apenas os valores nao nulos ou vazios.
    final_formated_commands = remove_empty_from_list(formated_command_2)

    final = {
        "command": _noscmd,
        "commands": [],
        "description": None,
        "instructions": no_code_split[1],
        "original": _noscode,
        "translation_origins": formated_command_1
    }

    for command in final_formated_commands:
        try:
            search = RESERVED[command]
            if search:
                final["commands"].append(search)
        except Exception as _erro:
            print("[ ERRO ]: ", _erro)
    try:
        if len(cmd_listados) > 1:
            search = RESERVED[_noscmd]
            if search:
                final["description"] = search
            else:
                final["description"] = None
    except Exception as _erro:
        print("[ ERRO ]: ", _erro)

    DBG().debug(f"FINAL ----------> {final}")
    return final


# TODO Esse metodo precisa ser recursivo para buscar dependencias infinitas vezes,
#  desde que elas estejam definidas no codigo retornado
def include_dependencies(file: str):
    """Resolvendo o comando inclua"""
    print("--------------[ INCLUINDO DEPENDENCIAS ]--------------")
    linhas = open(file).readlines()
    dependecias = []
    linhas_finais = []
    remover_do_script_principal = []
    project_path = os.path.abspath(file)  # remove_empty_from_list(file.rsplit("/", 1))[0]

    for (i, linha) in enumerate(linhas):
        try:
            if re.match(r"^[a-zA-Z0-9 ]*.[^ =]*\"$", linha.strip()):
                remover_do_script_principal.append(i)

                arquivo = linha.strip().split(" ")[1].strip()
                arquivo = remove_empty_from_list(arquivo.rsplit("/"))
                arquivo_nome = ""
                if len(arquivo) > 1:
                    arq = arquivo
                    nome_tmp = arquivo[len(arquivo) - 1]
                    print("ESTRANHO ", arq.remove(nome_tmp), arquivo, nome_tmp)
                    caminho = "".join("/".join(arq).split('"')) + "/"
                    nome_tmp = "".join(nome_tmp.split('"')) + ".nos"
                    final_path = caminho + nome_tmp
                else:
                    arquivo_nome = "".join(arquivo[0].split('"'))
                    final_path = "".join(arquivo[0].split('"')) + ".nos"
                dependecias.append({"path": final_path, "nome": arquivo_nome})
            elif linha.strip() != "":
                for trash in remover_do_script_principal:
                    print("IMPORTACAO REMOVIDA:", linhas[trash])
                    linhas.pop(trash)
                break
        except Exception as _erro:
            print(_erro)

    for arquivo in dependecias:
        if os.path.isfile(project_path + "/" + arquivo["path"]):
            dependencia_lida = open(project_path + "/" + arquivo["path"]).readlines()
            linhas_finais.extend(dependencia_lida)
        else:
            print(("Dependencia " + arquivo["nome"] + " não encontrada em: " + project_path + "/" + arquivo["path"]))

    linhas_finais.extend(linhas)
    print("CARREGAMENTO DE DEPENDENCIAS FILIZADA...", remover_do_script_principal)

    return linhas_finais


def run_file(_file: str):
    """funcao para executar um arquivo nos"""
    code_nos = include_dependencies(file)
    code_py = []

    commenting = False
    for linha in code_nos:
        linha = linha.strip()

        # Removendo os comentarios de uma unica linha
        try:
            print("[ REMOVENDO ESSA LINHA ]:\n\t", linha, re.match(r"([^:]|^)//.*$", linha))
            linha = re.sub(r"([^\\:]|^)//.*$", "", linha)
        except Exception as _erro:
            print("[ ERRO ]: ", _erro)

        # Removendo os comentarios com multiplas linhas
        if re.match(r"/\*[\s\S]*?", linha):
            commenting = True
        elif re.match(r"\*/$", linha):
            commenting = False
            try:
                linha = re.sub(r"\*/$", "", linha)
            except Exception as _erro:
                print("[ ERRO ]: ", _erro)
        elif linha != "" and not commenting:
            vc = verify_command(linha)
            if len(vc) > 1:
                code_py.append(vc)
    return code_py


def execute(_file: str):
    print("-" * 50)
    analised = run_file(_file)
    print("-------------------------[ ANALISE ]-------------------------")
    pprint(analised)
    print("-------------------------[ Traduzido ]-------------------------")
    saved = save_final_code(nos_to_python(analised))
    print("Output: ", saved)
    print("Programa finalizado...\n\n")


def run():
    """funcao principal"""
    while True:
        cmd_process = input("{NOS} -> ")
        cmd_process_base = cmd_process.split(" ")
        if cmd_process_base[0] == "run":
            execute(cmd_process_base[1])
        elif cmd_process_base[0] == "build":
            project_path = "".join(cmd_process_base[1].split('"'))
            tmp_name = cmd_process.split("--name=")
            print("NOMES...", tmp_name)
            nome_da_app = "app"
            if len(tmp_name) > 1:
                nome_da_app = "".join(nome_da_app.split('"'))
            execute(project_path)
            print("Compilando o programa...", tmp_name)
            BUILDER().build(nome_da_app, project_path)
            print("Fim da compilação", nome_da_app)
        elif cmd_process[0] == "q" or "exit":
            print("Terminando o programa...")
            exit(0)
        elif KeyboardInterrupt:
            print("Terminando o programa...")
            exit(0)


if __name__ == '__main__':
    print("""
┌=============================================================================================================┐
|                                      ##                               ##                                    |
|                                     #     ##     ##   #####    ####     #                                   |
|                                     #     ####   ##  ##   ##  ##        #                                   |
|                                    ##     ##  ## ##  ##   ##   ###      ##                                  |
|                                     #     ##    ###  ##   ##     ##     #                                   |
|                                     #     ##     ##   #####   ####      #                                   |
|                                      ##                               ##                                    |
|                                                                                                             |
|                   #####   #####  ###    ###        ##   ##  ##  ##     ##  ####     #####                   |
|                   ##  ##  ##     ## #  # ##        ##   ##  ##  ####   ##  ##  ##  ##   ##                  |
|                   #####   #####  ##  ##  ##  ####  ##   ##  ##  ##  ## ##  ##  ##  ##   ##                  |
|                   ##  ##  ##     ##      ##         ## ##   ##  ##    ###  ##  ##  ##   ##                  |
|                   #####   #####  ##      ##          ###    ##  ##     ##  ####     #####                   |
└=============================================================================================================┘
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       Linguagem de programação {Nos}                                        |
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│   [ Versão ]: 0.0.1                                                                                         |
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│   [ Data de lançamento ]: 13-Julho-2021 21:40                                                               |
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│   [ Author e mantainer ]: Filipe Lukebana                                                                   |
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│   [ website ]: https://www.nos.luk3d.com                                                                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
|                                      [ COMANDOS USADOS NO COMPILADOR ]                                      |
|   EXECUTAR UM SCRIPT NOS: [ run nome_do_script.nos ]                                                        |
|   TERMINAR O COMPILADOR:  [ q ] OU [ exit ]                                                                 |
|_____________________________________________________________________________________________________________|
""")
    run()
elif len(argv) > 1 and argv[1].endswith(".no"):
    run_file(argv[1])
else:
    print("Falha ao executar o compilador {NOS}, verifique se definiu os comandos corretos!")
