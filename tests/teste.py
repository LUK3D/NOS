nome=""
idade=""
continuar=""
def executa():
    print("\033[H\033[J")
    nome=input("Informe o seu nome: ")
    idade=input("Informe a idade: ")
    print(nome,"a sua idade e: ", idade)
    continuar=input("Pretende continuar? ")
    if(continuar == "sim"):
    	executa()
    
    else:
    	print("Fim do programa")


executa()