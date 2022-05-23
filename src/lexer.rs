

//=======================================================================================================================
//                                                                                                                       
//  ##      #####  ##    ##  #####  #####                                                                                
//  ##      ##      ##  ##   ##     ##  ##                                                                               
//  ##      #####    ####    #####  #####                                                                                
//  ##      ##      ##  ##   ##     ##  ##                                                                               
//  ######  #####  ##    ##  #####  ##   ##                                                                              
//  AUTHOR: LUK3D                                                                                                        
//=======================================================================================================================


#[path="core/structures.rs"]
mod structures;
use structures::*;



pub struct Lexer{
    pub current_text:String,
    pub file_name:String,
    pub current_character:String
}


impl Lexer{

    pub fn new() -> Lexer {
        Self {
            current_text : "".to_string(),
            file_name : "<stdoin>".to_string(),
            current_character : "".to_string()
        }
    }

    pub fn run(&self){


        let results = self.generate_tokens();

        if results.errors.len()>0 {
            for error in results.errors {
                print!("{0}",error.to_string());
            }
        }else{
            for token in results.tokens {
                print!("{0}",token.t_rsttn());
            }
        }
        println!("");

    }

    pub fn generate_tokens(&self)-> TokenResult{

        let white_spaces = " \n\t";
        let operators = "/*-+";
        let delimiters = "()";
        let digits = "0123456789";
        let mut decimal =0;
    
        let mut position = Position{
            index:-1,
            line_number:1,
            column:-1
        };
    
        let mut result = TokenResult{
            tokens:vec![],
            errors:vec![]
        };
    
        let mut tokens:Vec<Token> = Vec::new();
    
        let mut current_token = Token{
            _type:None,
            _value:None
        };
        let mut current_text:String = "".to_string();
    
        let f_line = format!("{0} ", &self.current_text).to_string();
    
        for i in 0..f_line.chars().count() {
            
            
            let mut current_character = f_line.chars().nth(i).unwrap();
            
            position = position.process(&current_character.to_string());
    
              if white_spaces.contains(current_character) {
                
            
                  if Self::validate_token(&current_token) {
                    current_token = Token{
                        _type:current_token._type,
                        _value:Some(current_text.to_string())
                    };
                    /**Adding new Token to the list */
                    tokens.push(current_token);
                    current_text = "".to_string();
                    current_token = Self::clear_toke();
                    decimal = 0;
                  }
                 
                }else if digits.contains(current_character) || current_character == '.'{
    
                    let mut tmp_token = match current_token._type{
                        Some(v)=>v,
                        None=>TokenTypes::INTEGER
                    };
    
                    /**Making new Number */
                        if current_character =='.'{
                            decimal = decimal+1;
                            current_token._type =Some(TokenTypes::FLOAT);
                        }
                        if decimal>1{
                            result.errors.push(structures::illegal_character(&format!("'{0}', Float Numbers can not have more than one floating points 😅", current_character),&self.file_name,&f_line,position));
                            return result;
                        }
                        if decimal >0{
                            tmp_token = TokenTypes::FLOAT;
                        }
                        current_token._type = Some(tmp_token);
    
                    
                    current_text  = format!("{0}{1}",current_text, current_character.to_string());
                }else if current_character == '+'{
    
                    
                    if Self::validate_token(&current_token){
                        current_token = Token{
                        _type:current_token._type,
                        _value:Some(current_text.to_string())
                        };
                        tokens.push(current_token);
                        current_text = "".to_string();
                        current_token = Self::clear_toke();
                        decimal = 0;
                    }
    
                    current_token._type =Some(TokenTypes::PLUS);
    
                }else if current_character == '-'{
    
                    if Self::validate_token(&current_token){
                        current_token = Token{
                        _type:current_token._type,
                        _value:Some(current_text.to_string())
                        };
                        tokens.push(current_token);
                        current_text = "".to_string();
                        current_token = Self::clear_toke();
                        decimal = 0;
    
                    }
                    
                    current_token._type =Some(TokenTypes::MINUS);
    
                }else if current_character == '*'{
    
                    if Self::validate_token(&current_token){
                        current_token = Token{
                        _type:current_token._type,
                        _value:Some(current_text.to_string())
                        };
                        tokens.push(current_token);
                        current_text = "".to_string();
                        current_token = Self::clear_toke();
                        decimal = 0;
    
                    }
                    current_token._type =Some(TokenTypes::MULTIPLY);
    
                }else if current_character == '/'{
    
                    if Self::validate_token(&current_token){
                        current_token = Token{
                        _type:current_token._type,
                        _value:Some(current_text.to_string())
                        };
                        tokens.push(current_token);
                        current_text = "".to_string();
                        current_token = Self::clear_toke();
                        decimal = 0;
    
                    }
                    current_token._type =Some(TokenTypes::DIVIDE);   
    
                }else if current_character == '('{
    
                    current_token = Token{
                    _type:current_token._type,
                    _value:Some(current_text.to_string())
                    };
                    tokens.push(current_token);
                    current_text = "".to_string();
                    current_token = Self::clear_toke();
                    decimal = 0;
    
                    current_token._type =Some(TokenTypes::PARENTHESES_LEFT); 
    
                }else if current_character == ')'{
    
                    current_token = Token{
                    _type:current_token._type,
                    _value:Some(current_text.to_string())
                    };
                    tokens.push(current_token);
                    current_text = "".to_string();
                    current_token = Self::clear_toke();
                    decimal = 0;
    
                    current_token._type =Some(TokenTypes::PARENTHESES_RIGHT); 
    
                }else{
                    let cc = current_character;
                    result.errors.push(structures::illegal_character(&format!("'{0}'", cc),&self.file_name,&f_line,position));
                    return result;
                }
                
                /**Adding new Token to the list */
                if operators.contains(current_character){
                    tokens.push(current_token);
                    current_text = "".to_string();
                    current_token = Self::clear_toke();
                    decimal = 0;
    
                }
                
    
              
              
        }
        result.tokens = tokens;
    
        return result;
    
    
    }

    pub fn validate_token(current_token:&Token)->bool{
        let current_type = match &current_token._type{
            Some(v)=>v,
            None=>&TokenTypes::UNDEFINED
        };
        let val = match &current_token._value{
            Some(v)=>v,
            None=>""
        };
    
        return current_type.value() != TokenTypes::UNDEFINED.value()
    
    }

    pub fn clear_toke()->Token{
        return Token{
            _type:None,
            _value:None
        };
    }
    
}



