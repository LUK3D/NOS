import os
import pathlib
import subprocess
class noscli:
    
    def run(file):
        path = pathlib.Path(__file__).parent.resolve()
        project = os.path.abspath(os.getcwd())
        
        print("PATH", path)
        print("PROJECT", project)
        nosFile = project+"\\"+file
        code = open(nosFile, "r")
        print("Executando", nosFile)
        #subprocess.Popen( "start \""+nosFile+"\"", shell=True, stdout=subprocess.PIPE ).wait()
        print("Finalizamos..............................................................")
        print(code.read())
        
    while True:
        cm = input("nos-> ")
        cm = cm.strip().split("->")
        if cm[0].strip() =="run":
            run(cm[1].strip())
        else:
            print("Nenhum comando!")

    