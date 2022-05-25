




/** # TOKEN
 * Extrutura de Cada parte de uma instrução
 * Para cada uma da estrutruras dentro de uma instrução, deve ter um tipo e um valor opcional
 */
pub struct Token{
    /** Tipo de Token */
    pub _type:Option<TokenTypes>,
    /** Valor do Toke */
    pub _value:Option<String>
}


impl Token{
    /** 
     * # Token Representation
     * The token representation for debug purpose 
     * 
     * [TOKEN_TYPE]:[VALUE]
     * 
     * */
    pub fn t_rsttn(&self) -> String{

        let def_str:String = "".to_string();
        let res = match &self._value{
            Some(v)=>v,
            None => &def_str
        };
        let _type = match &self._type{
            Some(v)=>v,
            None => &TokenTypes::UNDEFINED 
        };
        
        if res.len()>0{
            return format!("[{0}:{1}]",_type.value(),res);
        }else{
            return format!("[{0}]",_type.value());
        }
    }
}

#[derive(Copy, Clone)]
pub enum TokenTypes {
   INTEGER,
   FLOAT,
   STRING,
   AR_OPERATION,
   PLUS,
   MINUS,
   DIVIDE,
   MULTIPLY,
   UNDEFINED,
   PARENTHESES_LEFT,
   PARENTHESES_RIGHT
}

 impl TokenTypes{
    /**Return the current value */
    pub fn value(&self) -> String {
        match *self {
            TokenTypes::INTEGER => "INTEGER".to_string(),
            TokenTypes::FLOAT => "FLOAT".to_string(),
            TokenTypes::STRING => "STRING".to_string(),
            TokenTypes::AR_OPERATION => "AR_OPERATION".to_string(),
            TokenTypes::PLUS => "PLUS".to_string(),
            TokenTypes::MINUS => "MINUS".to_string(),
            TokenTypes::DIVIDE => "DIVIDE".to_string(),
            TokenTypes::MULTIPLY => "MULTIPLY".to_string(),
            TokenTypes::UNDEFINED => "UNDEFINED".to_string(),
            TokenTypes::PARENTHESES_LEFT => "PARENTHESES_LEFT".to_string(),
            TokenTypes::PARENTHESES_RIGHT => "PARENTHESES_RIGHT".to_string(),
        }
    }
}



pub struct TokenResult{
    pub tokens:Vec<Token>,
    pub errors:Vec<Error>
}

impl TokenResult{
    
    pub fn new()->TokenResult{
        return TokenResult{
            tokens: vec![],
            errors: vec![]
        };
    }

    pub fn add(&mut self, mut tokenresult:TokenResult)->Option<&TokenResult>{

        self.tokens.append(&mut tokenresult.tokens);
        self.errors.append(&mut tokenresult.errors);

        return Some(self);

    }
}


pub struct Position{
    pub index:i64,
    pub line_number:i64,
    pub column:i64
}

impl Position{
    
    pub fn process(&self, current_char:&str)->Position{
        let mut p = Position{
            index: self.index+1,
            line_number: self.line_number,
            column: self.column+1,
        };

        if current_char == "\n"{
            p.line_number = p.line_number+1;
            p.column = 0;
        }

        return p;
    }

    pub fn copy(&self)->Position{
        return Position{
            index: self.index,
            line_number: self.line_number,
            column: self.column,
        };
    }
}


/**
 * ***********************************************************************
 * ERROR STRUCTURES AND IMPLEMENTATIONS **********************************
 * ***********************************************************************
 */

pub struct Error{
    pub name:Option<String>,
    pub details:Option<String>,
    pub position:Position,
    pub file_name:String,
    pub command:String
}

impl Error{

    /**String representation of an error */
    pub fn to_string(&self)->String{
        let name = match &self.name{
            Some(v)=>v,
            None=>""
        };
        let details = match &self.details{
            Some(v)=>v,
            None=>""
        };

        let mut char_pos = "".to_string();

        for elem in 0..(self.position.column) {
            char_pos  = format!("{0} ",char_pos);
        }
        char_pos  = format!("{0}^",char_pos);

       
        let result = format!("\tFile \"{3}\", line {2},  \n\t{0}: {1} \n\t{4}\n\t{5}", name, details,self.position.line_number,  self.file_name, self.command, char_pos);
        return result;
    }
}

pub fn illegal_character(details:&str, file_name:&str, command:&str, position:Position)->Error{
    let err = Error{
        name : Some("Illegal Character".to_string()),
        details : Some(details.to_string()),
        position:position,
        file_name:file_name.to_string(),
        command:command.to_string()
    };
    return err;
}


pub struct Program{

}

impl Program{

}


