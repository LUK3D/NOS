

n1=0
n2=0
n3=0
r=0
entrada=""
entrada=input("Informe a primeira nota: ")
n1=int(entrada)
entrada=input("Informe a segunda nota: ")
n2=int(entrada)
entrada=input("informe a terceira nota: ")
n3=int(entrada)
print("\033[H\033[J")
r = (n1+n2+n3)/3
print("A media aritmética é: ", r)
if(r>=6):
	print("Apto")

else:
	print("Não Apto")
