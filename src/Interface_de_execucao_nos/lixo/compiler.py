import json

""" VERIFY INTERNAL FUNCTION ON DATA """
def verify_data_type(data_json):
    try:
        # CHECK STRING TYPE
        if data_json['type'] == 'var' or  data_json['type'] == 'string' or  data_json['type'] == 'text':   
            try:
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
                return "print("+ data_json['value']+")"
            if data_json['label'] == 'read':
                return "print("+ data_json['value']+")"
    except:
        return None
 
 
# file_ = 'data_function.json'
# file_ = 'data.json'
# file_ = 'data2.json'
file_ = 'data3.json'

with open(file_) as f:
  data = json.load(f)

defstringfunction = ""

# for struct in data:
#     if struct['type'] == 'function':
#         defstringfunction = defstringfunction[:-1]
#         defstringfunction = defstringfunction+ "def "+struct['label']+"():\n\t"
#         for functionsup in struct['value']:
#             if functionsup['type'] == 'internalFunction':
#                 if functionsup['label'] == 'show': 
#                     defstringfunction = defstringfunction + "print("+functionsup['value']+")\n\t"
#                 elif functionsup['label'] == 'read': 
#                         defstringfunction = defstringfunction + functionsup['value']+" = input()\n\t"
        
# print(defstringfunction)


instruction = ''

for struct in data:
    if struct['type'] == 'internalFunction':
        instruction += verify_internal_function(struct) +'\n'
    else:
        instruction += verify_data_type(struct) +'\n'
     

print(instruction)       
exec(instruction)
# exec("inicio() ")