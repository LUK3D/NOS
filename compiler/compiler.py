
import os
import json
import sys
import py_compile


""" VERIFY INTERNAL FUNCTION ON DATA """
def verify_data_type(data_json):
    try:
        # CHECK STRING TYPE
        if data_json['type'] == 'var' or  data_json['type'] == 'string' or  data_json['type'] == 'text' or data_json['type'] == 'float' or data_json['type'] == 'int':
            try:
                return data_json['value'] + ' = ""'
                if data_json['value']['type'] == 'internalFunction' and data_json['value']['label'] == 'show':
                    return "print("+ data_json['value']['value']+")"
            except:
                return data_json['label'] +' = '+ data_json['value']
        return data_json['label'] +' = '+ data_json['value']
    except IndexError:
        return "Index Exception"

""" VERIFY INTERNAL FUNCTION """
def verify_internal_function(data_json):
    try:
        if data_json['type'] == 'internalFunction':
            if data_json['label'] == 'show':
                return "print"+ data_json['value']+""
            if data_json['label'] == 'read':
                if data_json['type'] == 'int' or data_json['type'] == 'number':
                    return data_json['value'] + "= float(input())"
                else:
                    return "t = input() \ntry: \n\t"+ data_json['value']  +" = float(t)"+ "\nexcept :\n\t" + data_json['value'] + " = t"

                    #return data_json['value'] + "= input()"
    except:
        return None



#O arquivo utilizado para armaenar o codigo gerado por nos e o data3.json
file_ = 'nos.tmp'
d = open(file_, "r")

data = json.loads(d.read())
defstringfunction = ""
instruction = ''

#Eliminando todo o testo para nao deixar vestijos
#delete = open(file_, "w")

for struct in data:
    if struct['type'] == 'internalFunction':
        instruction += verify_internal_function(struct) +'\n'
    else:
        instruction += verify_data_type(struct) +'\n'
#escrevendo o novo codigo no arquivo
f = open("nos.py", "w")
f.write(instruction)
f.close()
#Compilando o arquivo
#py_compile.compile("nos.py","Compilado.pyc")
#Executando o arquivo compilado
#os.startfile(os.getcwd() + "/Compilado.pyc")
#sys.exit()

#print(instruction)
exec(instruction)

