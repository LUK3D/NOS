import os
import pathlib
import subprocess
import glob

class cls(object):
    def __repr__(self):
        import os
        os.system('cls' if os.name == 'nt' else 'clear')
        return ''


class noscli:
    
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
        except:
            print("Oo.. Ouve um erro inesperado")
            print("DETALHES DO ERRO:")
            print("\tProvavelmente alguns aquivos foram removidos da pasta de instalação")
        
    while True:
        cm = input("nos-> ")
        cm = cm.strip().split("->")
        if cm[0].strip() =="run":
            run(cm[1].strip())
        else:
            print("Nenhum comando!")

    