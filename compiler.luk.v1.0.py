import json
import re
from pprint import pprint
from typing import Tuple, List
from sys import argv, exit

from debugger import DBG


def save_final_code(code: str):
    """método para salvar o código python gerado em um arquivo"""
    with open("output.py", "w") as py_file:
        py_file.write(code)
        return "Arquivo gerado em: output.py"


def indent_code(_times: int):
    """calcular a quantidade de vezes que o código deve ser indentado"""
    return "\t" * _times if _times > 0 else ""


def join_tuple_string(strings_tuple: Tuple) -> str:
    """function that converts tuple to string"""
    return ' '.join(strings_tuple)


# TODO refazer toda a lógica de tradução,
#  porque agora ja temos tudo informado. so precisamos traduzir
def nos_to_python(_commands: List):
    """método para conversão do código nós para python"""
    script = []
    indentationSteps = 0
    for commad in _commands:
        DBG().debug(f"{commad}")
        code_line = ""
        if commad["description"] is not None:
            if not commad["description"]["ignore_on_translate"]:
                code_line = (
                        indent_code(indentationSteps) +
                        commad["description"]["command"] +
                        commad["instructions"]
                )
            if commad["description"]["end"] is not None:
                code_line += commad["description"]["end"]
        else:
            code_line = (
                    indent_code(indentationSteps) +
                    commad["command"] +
                    commad["instructions"]
            )
        command = str(commad["command"]).strip()

        # verificando se estamos a entrar ou sair no escopo de uma função.
        if len(command) > 0:
            if commad["description"] is None or command[-1] == "{":
                if command == "{":
                    code_line = ""
                    indentationSteps += 1
            if command == "}" or command[-1] == "}":
                indentationSteps -= 1
                code_line = ""

        # removendo o ';' do código
        if len(code_line) > 0:
            if code_line[-1] == ";":
                code_line = code_line[:-1]
        else:
            continue

        # adicionando o comando final a lista
        script.append(code_line)

    DBG().debug(f"{script}")
    return "\n".join(script)


def verify_command(_noscode: str):
    """processa o comando e retorna o objecto que o representa no dicionário do {NOS}"""
    cmd_listados = _noscode.split(" ")
    _noscmd = cmd_listados[0] if (len(cmd_listados) > 1) else _noscode
    no_code_split = _noscode.split(_noscmd)

    # TODO: Adicionar suporte a variáveis internas e funções
    # regex = "(.*[\("+"".join(RESERVED["attrib_operadores"]["command_scaped"])+"])"
    # Pega todos os comandos que terminam em (),(,
    regex = re.compile(r"([aA-z_Z ]*(\(|\(\)|\( *))")
    # O regex acima retorna tuples, então precisa ser convertido para lista
    formated_command_1 = map(join_tuple_string, regex.findall(_noscode))
    formated_command_1 = " ".join(formated_command_1)

    # Pegando apenas palavras e ignorando qualquer carácter especial
    regex2 = re.compile("[A-Za-z_]*")
    formated_command_2 = regex2.findall(formated_command_1)

    # Limpando a lista e deixando apenas os valores nao nulos ou vazios.
    final_formated_commands = [x for x in formated_command_2 if x]

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
            print(_erro)

    DBG().debug(f"FINAL ----------> {final}")

    if len(cmd_listados) > 1:
        try:
            search = RESERVED[_noscmd]
            if search:
                final["description"] = search
            else:
                final["description"] = None
        except Exception as _erro:
            print(_erro)

    return final


def run_file(file):
    """FUNCAO PARA EXECUTAR UM ARQUIVO NOS"""
    code_nos = open(file).readlines()
    code_py = []
    for linha in code_nos:
        linha = linha.strip()
        if linha != "":
            vc = verify_command(linha)
            if len(vc) > 1:
                code_py.append(vc)
    return code_py


def run():
    """FUNCAO PRINCIPAL"""
    while True:
        cmd_process = input("{NOS} -> ").split(" ")
        if cmd_process[0] == "run":
            print("-" * 50)
            analised = run_file(cmd_process[1])
            print("-------------------------[ ANALISE ]-------------------------")
            pprint(analised)
            print("-------------------------[ Traduzido ]-------------------------")
            saved = save_final_code(nos_to_python(analised))
            print("Output: ", saved)
            print("Programa finalizado...\n\n")
        elif cmd_process[0] == "q" or "exit":
            print("Terminando o programa...")
            exit(0)
        elif KeyboardInterrupt:
            print("Terminando o programa...")
            exit(0)


if __name__ == '__main__':
    # perdão tirei o try daqui para puder capturar melhor as falhas!
    print("""
""")

    # LENDO O DICIONÁRIO COM AS PALAVRAS RESERVADAS DE {NOS}
    with open('./core/dictionary.json', ) as f:
        RESERVED = json.load(f)
        run()
