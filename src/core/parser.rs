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
    null(String)

}

/**
 * # Operation
 * Defines the kinds of operation that Terms and Expressions operated wtih 
 * Operations: `+, / , * , -`
 */
#[derive(std::clone::Clone)]
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



#[derive(std::clone::Clone)]
pub struct Operator{
    l_term:Value,
    r_term:Value,
    operation:Operation
}


impl Operator{
    pub fn new()->Self{
        return Self{
            l_term:Value::null("".to_string()),
            r_term:Value::null("".to_string()),
            operation:Operation::undefined
        };
    }

    pub fn representation(self)->String{
        if Operation::undefined.value() != self.operation.value(){
            return format!("operator: {0} (NumericLiteral: {1}, NumericLiteral: {2})", getOperation(&Some(self.operation).clone()),  getValue(&Some(self.l_term).clone()),  getValue(&Some(self.r_term).clone()))
        }else{
            return format!("NumericLiteral: {}",getValue(&Some(self.l_term).clone()));
        }
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
        Value::string(v)=>v.to_string(),
        Value::null(v)=>"".to_string()
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



pub struct Expression{

    operator:Option<Operator>,
    exp_operation:Operation,
    expression:Option<Box<Expression>>

}

impl Expression{

    pub fn new()->Self{

        return Expression{
            operator:Some(Operator::new()),
            exp_operation:Operation::undefined,
            expression:None
        };
    }

    pub fn copy(self)->Self{
        return Self{
            operator:self.operator,
            exp_operation:self.exp_operation,
            expression:self.expression
        }
    }


    pub fn extract_representation(self)->String{
        let mut res = "".to_string();
        let s = match self.operator.clone(){
            Some(v)=>v,
            None=>Operator::new()
        };
        let Expression { operator, expression, exp_operation } = self;
        let Operator { l_term, r_term, operation } = operator.clone().unwrap();

        let rep = operator.unwrap().representation();

        if rep.len()>0{
            res = format!("(BinaryExpression: {}", rep);
        } 
  
        let n = Box::new(Expression::new());
        let exp = unbox(match expression{
            Some(v)=>v,
            None=>n
        });

    
        let comp_bin_oper = exp_operation.value().clone();
    
        if &exp.operator.as_ref().unwrap().operation.value() != &Operation::undefined.value(){
            res = format!("(ComplexExpression: Operator: {1} {0} , ({2}))", res,comp_bin_oper, exp.extract_representation());
        }else{

            if &exp_operation.value() != &Operation::undefined.value(){
                res = format!("(ComplexExpression: Operator: {1} ({0} , {2}))", res,comp_bin_oper, exp.extract_representation() );
            }
        }
        
        res = format!("{0})", res);
    
        return res;
    }


}



pub struct Parser;

impl Parser{

    pub fn parse()->String{
        let body = Expression{
            operator:Some(Operator{
                l_term:Value::int(1),
                r_term:Value::int(2),
                operation:Operation::sum
            }),
            exp_operation:Operation::multiply,
            expression: Some(
                Box::new(Expression{
                    operator:Some(Operator{
                        l_term:Value::int(32),
                        r_term:Value::null("".to_string()),
                        operation:Operation::undefined
                    }),
                    exp_operation:Operation::divide,
                    expression:Some(
                        Box::new(Expression{
                            operator:Some(Operator{
                                l_term:Value::int(3),
                                r_term:Value::int(5),
                                operation:Operation::multiply
                            }),
                            exp_operation:Operation::undefined,
                            expression:None
                        }
                    ))
                }
            ))
        };

        return body.extract_representation();
    }

}

// 1+2




