import os
import pathlib
import subprocess
import glob

class cls(object):
    def __repr__(self):
        os.system('cls' if os.name == 'nt' else 'clear')
        return ''


class noscli:


    # define our clear function
    def clear():
    
        # for windows
        if os.name == 'nt':
            _ = os.system('cls')
    
        # for mac and linux(here, os.name is 'posix')
        else:
            _ = os.system('clear')
    
    def run(file):
        
        try:
            path = pathlib.Path(__file__).parent.resolve()
            project = os.path.abspath(os.getcwd())
            finalNosPath = str(path).replace("bin", "resources\\tmp\\code.nos")
            finalPycodePath = str(path).replace("bin", "resources\\tmp\\code.py")
            nosEXE = str(path).replace("bin","nos-ide.exe")
            #print("PATH", path)
            #print("PROJECT", project)
            #print("FINALPATH", finalNosPath)
            #print("NOSEXE", "start "+nosEXE)
            #if not file.strip():
            #    files=glob.glob(project+'\\*.nos')
            #    file =files[0]
            nosFile = project+"\\"+file
            #print("NOSFILE", "start "+nosFile)
            code = open(nosFile, "r")
            tmpNos = open(finalNosPath, "w")
            tmpNos.write(code.read())
            tmpNos.close()
            #print("Executando", nosFile)
            subprocess.check_call( [nosEXE] )
            #print("Finalizamos..............................................................")
            cls()
            subprocess.call( "\""+finalPycodePath+"\"", shell=True)
            cls()
        except:
            print("Oo.. Ouve um erro inesperado")
            print("DETALHES DO ERRO:")
            print("\tProvavelmente alguns aquivos foram removidos da pasta de instalação")
    def vrsion():
        s = """ 
 ┌=============================================================================================================┐
 |   ##     ##   #####    ####      #####   #####  ###    ###        ##   ##  ##  ##     ##  ####     #####    |
 |   ####   ##  ##   ##  ##         ##  ##  ##     ## #  # ##        ##   ##  ##  ####   ##  ##  ##  ##   ##   |
 |   ##  ## ##  ##   ##   ###       #####   #####  ##  ##  ##  ####  ##   ##  ##  ##  ## ##  ##  ##  ##   ##   |
 |   ##    ###  ##   ##     ##      ##  ##  ##     ##      ##         ## ##   ##  ##    ###  ##  ##  ##   ##   |
 |   ##     ##   #####   ####   ##  #####   #####  ##      ##          ###    ##  ##     ##  ####     #####    |
 └=============================================================================================================┘
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ Linguagem de programação {Nos}                                                                              |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Versão 0.0.1                                                                                                |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Data de lançamento: 13-Julho-2021 21:40                                                                     |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ Author: Filipe Lukebana                                                                                     |
 ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │ website:https://www.nos.luk3d.com                                                                           │
 └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘"""



        print(s)

    while True:
        cm = input("nos-> ")
        cm = cm.strip().split("->")
        if cm[0].strip() =="run":
            run(cm[1].strip())
        if cm[0].strip().lower() =="i":
            vrsion()
        if cm[0].strip().lower() =="c":
            clear()
        

    