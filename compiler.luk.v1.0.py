
import json
import re

f = open('./core/dictionary.json',)
RESERVED = json.load(f) #LENDO O DICIONARIO COM AS PALAVRAS RESERVADAS DE {NOS}
f.close()

# METODO PARA SALVAR O CODIGO PYTHON GERADO EM UM ARQUIVO
def save_final_code(code):
    f = open("output.py", "w")
    f.write(code)
    f.close()
    return "Arquivo gerado em: output.py"

# CALCULAR A QUANTIDADE DE VEZES QUE O CODIGO DEVE SER IDENTADO
def indent_code (_times:int):
    return ("\t"*_times) if(_times>0) else ""


# function that converts tuple to string
def join_tuple_string(strings_tuple) -> str:
   return ' '.join(strings_tuple)


# MÉTODO PARA CONVERSÃO DO CÓDIGO NÓS PARA PYTHON
# TODO refazer toda a logica de traducao, porque aora ja temos tudo informado. so precisamos traduzir
def nos_to_python(_commands:list):
    script = []
    indentationSteps = 0
    for commad in _commands:
        print("Linha-> ", commad)
        code_line = ""
        if(commad["description"]!=None):
            if(commad["description"]["ignore_on_translate"] !=True):
                code_line = (indent_code(indentationSteps)+commad["description"]["command"] + commad["instructions"])
            if(commad["description"]["end"]!=None):
                code_line += commad["description"]["end"]
        else:
            code_line = (indent_code(indentationSteps)+commad["command"] +commad["instructions"])
        command = str(commad["command"]).strip()

# VERIFICANDO SE ESTAMOS A ENTRAR NO ESCOPO DE UMA FUNÇÃO, OU ESTAMOS A SAIR DO ESCOPO DE UMA.
        if(len(command)>0):
            if(commad["description"]==None or command[-1]=="{"):
                if(command == "{"):
                    code_line=""
                    indentationSteps +=1
            if(command == "}" or command[-1]=="}"):
                indentationSteps -=1
                code_line=""

        # REMOVENDO O ; DO CODIGO
        if(len(code_line)>0):
                if(code_line[-1]==";"):
                    code_line = code_line[:-1]

        # ADICIONANDO O COMANDO FINAL NA LISTA
        script.append(code_line)

    print(script)
    return "\n".join(script)


# PROCESSA O COMANDO E RETORNA O OBJECTO QUE O REPRESENTA NO DICIONARIO DO {NOS}
def verify_command(_noscode: str):
    spl_cmd = _noscode.split(" ")
    _noscmd =  spl_cmd[0] if (len(spl_cmd)>1) else _noscode
    no_code_split = _noscode.split(_noscmd)

    # TODOD: Adicionar suporte a variaveis internas e funcoes
    # regex = "(.*[\("+"".join(RESERVED["attrib_operadores"]["command_scaped"])+"])" 
    regex = "(([aA-z_Z ]*(\(|\(\)|\( *)))" #Pega todos os comandos que terminam em (),(, 
    formated_command_1 = map(join_tuple_string, re.findall(regex, _noscode)) #O regex a cima retorna tupulas, entao precisa ser convertido para lista
    regex2 = "[A-Za-z_]*" #Pegando apenas palavras e ignorando qualquer caracter especial
    formated_command_1 =" ".join(formated_command_1)

    formated_command_2 = re.findall(regex2,formated_command_1)
    final_formated_commands = [x for x in formated_command_2 if x] # Limpando a lista e deixando apenas os valores nao nulos ou vasios.


    final = {
        "command":_noscmd,
        "description":None,
        "instructions":no_code_split[1],
        "original":_noscode,
        "translation_origins":formated_command_1,
        "commands":[]
        }
    for command in final_formated_commands:
        try:
            search = RESERVED[command]
            if(search):
                final["commands"].append(search)
        except Exception as erro:
            print(erro)

    print("FINAL----------",final)

    if(len(spl_cmd)>1):
        try:
            search = RESERVED[_noscmd]
            if(search):
                final["description"] = search
            else:
                final["description"] = None
        except Exception as erro:
            print(erro)
        
    return (final)


# FUNCAO PARA EXECUTAR UM ARQUIVO NOS
def run_file(file):
    code_nos = open(file).readlines()
    code_py = []
    for linha in code_nos:
        linha = linha.strip()
        if(linha!=""):
            vc = verify_command(linha)
            if(len(vc)>1):
                code_py.append(vc)
                
        
    
    return code_py

# FUNCAO PRINCIPAL
def run():
    while(True):
        output = ""
        cmd = input("NOS->")
        cmd_process = cmd.split(" ")
        if(cmd_process[0] == "run"):
            print("--------------------------------")
            analised = run_file(cmd_process[1])  

            print("--------------------ANALISE--------------------------")
            print(analised)
            print("--------------------Traduzido--------------------------")
            saved = save_final_code(nos_to_python(analised))
            print("Output: ", saved)    
    return "Programa finalizado"  





if __name__ == '__main__':
    try:
        run()
       
        # print("Output: ",run())
    except Exception as erro:
        print(erro)
