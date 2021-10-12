from functools import cache
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

def remove_empty_from_list(_list: list) -> list:
    """function that removes whitespaces values from lists"""
    return [x for x in _list if x.strip()]

# TODO refazer toda a lógica de tradução,
#  porque agora ja temos tudo informado. so precisamos traduzir
def nos_to_python(_commands: List):
    """método para conversão do código nós para python"""
    script = []
    indentationSteps = 0
    # NOVA LOGICA DE TRADUCAO
    for n_cmd in _commands:
        if(len(n_cmd)>0):
            print(f"-------------------------------------------------------------------------------------------------------------------------")
            code_line = ""
            """Bloco de codigo para traduzir os comandos reconhecidos pelo sistem, ou seja, que se encontram no dicionário. """
            if  n_cmd["description"]:
                if(n_cmd["description"]["ignore_on_translate"]):
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
                idx= 0
                for idx, val in enumerate(final_to_replce):
                    if(val):
                        cmd_tmp = commands[idx]["command"].join(final_to_be_replaced[idx].strip().split(val)).join(cmd_tmp.split(val))

                        if(re.match("^([aA-z_Z])+( )+([aA-z_Z])+( )+([aA-z_Z])+", cmd_tmp)):
                            cmd_tmp = (commands[idx]["command"] + ([x for x in re.split(r'^([aA-z_Z])+( )+([aA-z_Z])+', cmd_tmp.strip()) if len(x)>1])[0])
            
            except Exception as _erro:
                print("ERRO! ",_erro)



            
            code_line = (indent_code(indentationSteps) +cmd_tmp)
        
            
            
            
        
            command = str(code_line).strip()

            # verificando se estamos a entrar ou sair no escopo de uma função.
            if len(command) > 0:
                if n_cmd["description"] is None or command[-1] == "{" or  command[-1] == "{:":
                    if command == "{" or  command[-1] == "{:":
                        code_line = code_line.rstrip()[:-1]
                        indentationSteps += 1
                if command == "}" or command.rstrip()[-1] == "}":
                    if command == "}":
                        code_line = code_line.rstrip()[:-1]
                        indentationSteps -= 1
                    

            # removendo o ';' do código
            if len(code_line) > 0:
                if code_line[-1] == ";":
                    code_line = code_line[:-1]
            else:
                continue
            
            #Verificando se o comando deve terminar com algum caractere definido no dicionario
            if  n_cmd["description"]:
                if(n_cmd["description"]["type"] == "bloc"): #Caso essa codicao seja verdadeira deve se remover os parenteses iniciais na funcao
                    code_line = re.split(r'[\(]', code_line).join("")
                if (n_cmd["description"]["end"] is not None):
                    code_line += n_cmd["description"]["end"]
            code_line =":".join(code_line.split("{:"))
            script.append(code_line)
            

            # adicionando o comando final a lista
            print(f"{code_line}")

            print(f"-------------------------------------------------------------------------------------------------------------------------")


            
            print("FINAL COD->", "\n".join(script))
    DBG().debug(f"{script}")
    return "\n".join(script)


def verify_command(_noscode: str):
    """processa o comando e retorna o objecto que o representa no dicionário do {NOS}"""

    # TODO: temos outro problema aqui nesta linha,
    #  ela apenas captura os comandos se estiverem separados por espaços!
    cmd_listados = _noscode.split(" ")
    _noscmd = cmd_listados[0] if (len(cmd_listados) > 1) else _noscode
    no_code_split = _noscode.split(_noscmd)

    # TODO: Adicionar suporte a variáveis internas e funções
    # regex = "(.*[\("+"".join(RESERVED["attrib_operadores"]["command_scaped"])+"])"
    # Pega todos os comandos que terminam em (),(,
    regex = re.compile(r"([aA-z_Z ]*(\(|\(\)|\( *))")
    # O regex acima retorna tuples, então precisa ser convertido para lista
    formated_command_1 = map(join_tuple_string, regex.findall(_noscode))
    formated_command_1 = " ".join(formated_command_1)[:-1]

    # Pegando apenas palavras e ignorando qualquer caracter especial
    regex2 = re.compile("[A-Za-z_]*")
    formated_command_2 = regex2.findall(formated_command_1)

    # Limpando a lista e deixando apenas os valores nao nulos ou vazios.
    final_formated_commands = remove_empty_from_list (formated_command_2) 

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

    if len(cmd_listados) > 1:
        try:
            search = RESERVED[_noscmd]
            if search:
                final["description"] = search
            else:
                final["description"] = None
        except Exception as _erro:
            print(_erro)

    DBG().debug(f"FINAL ----------> {final}")
    return final


def run_file(file):
    """funcao para executar um arquivo nos"""
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
 │ Linguagem de programação {Nos}                                                                              |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Versão 0.0.1                                                                                                |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Data de lançamento: 13-Julho-2021 21:40                                                                     |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Author e mantainer: Filipe Lukebana                                                                         |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ website:https://www.nos.luk3d.com                                                                           │
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Colaborador e mantainer: Nurul-GC   website:https://github.com/Nurul-GC                                     |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 |                                  [ COMANDOS USADOS NO COMPILADOR ]                                          |
 |   EXECUTAR UM SCRIPT NOS: [ run nome_do_script.nos ]                                                        |
 |   TERMINAR O COMPILADOR:  [ q ] OU [ exit ]                                                                 |
 |_____________________________________________________________________________________________________________|
 """)

    # LENDO O DICIONÁRIO COM AS PALAVRAS RESERVADAS DE {NOS}
    with open('./core/dictionary.json', ) as f:
        RESERVED = json.load(f)
        run()
