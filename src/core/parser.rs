#[path="lexer.rs"]
mod lexer;
use lexer::structures::Token;


fn unbox<T>(value:Box<T>)->T{
    *value
}



#[derive(Clone)]
/**
 * # Value 
 * Data Types
 * Eg: `1, "test", false`
 * */
pub enum Value{
    string(String),
    int(i128),
    float(f64),
    bool(bool),

}

/**
 * # Operation
 * Defines the kinds of operation that Terms and Expressions operated wtih 
 * Operations: `+, / , * , -`
 */
pub enum Operation{
    multiply,
    divide,
    sum,
    minus,
    undefined,
}

impl Operation{
    /**Return the current value */
    pub fn value(&self) -> String {
        match *self {
            Operation::multiply => "*".to_string(),
            Operation::divide => "/".to_string(),
            Operation::sum => "+".to_string(),
            Operation::minus => "-".to_string(),
            Operation::undefined => "undefined".to_string(),
           
        }
    }
}

/**
 * # Term
 * Represents a binary operation between Values with Operations
 * 
 * Eg: `Value ((Operation) Value) *`
 */
pub struct Term{
    _type:String,
    l_value:Option<Value>,
    operation:Option<Operation>,
    r_value:Option<Value>
}

impl Term{

    pub fn new()->Self{
        return Self{
        _type:"Term".to_string(),
        l_value:None,
        operation:None,
        r_value:None
        }
    }

    pub fn representation(&self)->String{
        let l_value = getValue(&self.l_value);
        let r_value = getValue(&self.r_value);

        let mut res = "".to_string();

        if l_value != "0".to_string(){
            res = format!("NumericLiteral: {0} ", l_value);
        }
        if r_value != "0".to_string(){
            res = format!("{0} ((Operator: {1}) NumericLiteral: {2}) ",res, getOperation(&self.operation), r_value).to_string();
        }

        return format!("{0}", res.to_string())
    }
}



pub fn getValue(option:&Option<Value>)->String{
    let l_value = match option{
        Some(v)=>v,
        None=>&Value::int(0)
    };

    let l_value_v = match l_value{
        Value::bool(v)=>v.to_string(),
        Value::float(v)=>v.to_string(),
        Value::int(v)=>v.to_string(),
        Value::string(v)=>v.to_string()
    };

    return l_value_v;
}

pub fn getOperation(option:&Option<Operation>)->String{
    let operation = match option{
        Some(v)=>v,
        None=>&Operation::undefined
    };
    return operation.value();
}



/**
 * # Expression
 * Represents an Operation between two Terms
 * 
 * Eg `Term ((Operation) Term)*`
 */
pub struct Expression{
    _type:String,
    l_term:Option<Term>,
    operation:Option<Operation>,
    r_term:Option<Term>,
    expression:Option<Box<Expression>>,
    value:Option<Value>
}

impl Expression{

    pub fn new()->Self{
        return Self{
        _type:"Expression".to_string(),
        l_term:None,
        operation:None,
        r_term:None,
        expression:None,
        value:None
        }
    }

    pub fn representation(&self)->String{
        let n = Term::new();
        let l_term = match &self.l_term{
            Some(v)=>v,
            None=>&n
        };
        let r_term = match &self.r_term{
            Some(v)=>v,
            None=>&n
        };

        let mut res = "".to_string();

        if getValue(&l_term.l_value) !="0"{
            res = format!("Term {0}", l_term.representation());
        }
        if getValue(&r_term.l_value) !="0"{
            res = format!("{0} ((Operator {1}) Term {2})",res, getOperation(&self.operation), r_term.representation());
        }


        if self.expression.is_some() {

            


            // let exp = unbox(self.expression);

            return format!("Term {0}  ((Operator {1}) Term {2})", l_term.representation(), r_term.representation(), getOperation(&self.operation));
        }else{
            return format!("{0}",res);
        }
    }

    pub fn get_value(){

    }
}



pub enum ExpressionStatement{
    expression(Expression),
    term(Term)
}




pub struct NumericLiteral{
    _type:String,
    value:Value
}

impl NumericLiteral{

    pub fn new()->Self{
        return Self{
        _type:"NumericLiteral".to_string(),
        value:Value::int(0)
        }
    }
}








pub struct Program{
    _type:String,
    body:Expression
}

impl Program{
    pub fn get_str(self)->String{
        // let val = match self.body.value{
        //     Value::bool(v)=>v.to_string(),
        //     Value::float(v)=>v.to_string(),
        //     Value::int(v)=>v.to_string(),
        //     Value::string(v)=>v
        // };

        
        return format!("(Program  ({0} ({1})))",self.body._type, self.body.representation()).to_string()
    }
}


/**
 * Parses a Token into an AST
 */
pub struct Parser{
    tokens:Vec<Token>
}

impl Parser{
    pub fn parse()->String{

        /** */

        let mut program =  Program{
            _type:"Program".to_string(),
            body:Expression{
                   _type:"Expression".to_string(),
                   l_term:Some(
                    Term{
                        _type:"BinaryOperation".to_string(),
                        l_value:Some(Value::int(23)),
                        r_value:Some(Value::int(42)),
                        operation:Some(Operation::sum)
                   }
                   ),
                   r_term:
                   
                   Some(Term{
                    _type:"BinaryOperation".to_string(),
                    l_value:Some(Value::int(56)),
                    r_value:Some(Value::int(98)),
                    operation:Some(Operation::multiply)
                })
               
               ,
                   operation:Some(Operation::divide),
                   expression:None,
                   value:None
            }
        };
        return program.get_str();
    }
}

