#[path = "lexer.rs"]
pub mod lexer;
use lexer::structures::Token;
use lexer::structures::TokenTypes;

fn unbox<T>(value: Box<T>) -> T {
    *value
}

#[derive(Clone)]
/**
 * # Value
 * Data Types
 * Eg: `1, "test", false`
 * */
pub enum Value {
    string(String),
    int(i128),
    float(f64),
    bool(bool),
    null(String),
}

/**
 * # Operation
 * Defines the kinds of operation that Terms and Expressions operated wtih
 * Operations: `+, / , * , -`
 */
#[derive(std::clone::Clone)]
pub enum Operation {
    multiply,
    divide,
    plus,
    minus,
    undefined,
}

impl Operation {
    /**Return the current value */
    pub fn value(&self) -> String {
        match *self {
            Operation::multiply => "*".to_string(),
            Operation::divide => "/".to_string(),
            Operation::plus => "+".to_string(),
            Operation::minus => "-".to_string(),
            Operation::undefined => "undefined".to_string(),
        }
    }
}

#[derive(std::clone::Clone)]
pub struct Operator {
    l_term: Value,
    r_term: Value,
    operation: Operation,
}

impl Operator {
    pub fn new() -> Self {
        return Self {
            l_term: Value::null("".to_string()),
            r_term: Value::null("".to_string()),
            operation: Operation::undefined,
        };
    }

    pub fn representation(self) -> String {
        if Operation::undefined.value() != self.operation.value() {
            return format!(
                "operator: {0} (NumericLiteral: {1}, NumericLiteral: {2})",
                getOperation(&Some(self.operation).clone()),
                getValue(&Some(self.l_term).clone()),
                getValue(&Some(self.r_term).clone())
            );
        } else {
            return format!("NumericLiteral: {}", getValue(&Some(self.l_term).clone()));
        }
    }
}

pub fn getValue(option: &Option<Value>) -> String {
    let l_value = match option {
        Some(v) => v,
        None => &Value::int(0),
    };

    let l_value_v = match l_value {
        Value::bool(v) => v.to_string(),
        Value::float(v) => v.to_string(),
        Value::int(v) => v.to_string(),
        Value::string(v) => v.to_string(),
        Value::null(v) => "".to_string(),
    };

    return l_value_v;
}

pub fn getOperation(option: &Option<Operation>) -> String {
    let operation = match option {
        Some(v) => v,
        None => &Operation::undefined,
    };
    return operation.value();
}

#[derive(std::clone::Clone)]
pub struct Expression {
    operator: Option<Operator>,
    exp_operation: Operation,
    expression: Option<Box<Expression>>,
}

impl Expression {
    pub fn new() -> Self {
        return Expression {
            operator: Some(Operator::new()),
            exp_operation: Operation::undefined,
            expression: None,
        };
    }

    pub fn copy(self) -> Self {
        return Self {
            operator: self.operator,
            exp_operation: self.exp_operation,
            expression: self.expression,
        };
    }

    pub fn extract_representation(self) -> String {
        let mut res = "".to_string();
        let s = match self.operator.clone() {
            Some(v) => v,
            None => Operator::new(),
        };
        let Expression {
            operator,
            expression,
            exp_operation,
        } = self;
        let Operator {
            l_term,
            r_term,
            operation,
        } = operator.clone().unwrap();

        let rep = operator.unwrap().representation();

        if rep.len() > 0 {
            res = format!("(BinaryExpression: {}", rep);
        }
        let n = Box::new(Expression::new());
        let exp = unbox(match expression {
            Some(v) => v,
            None => n,
        });

        let comp_bin_oper = exp_operation.value().clone();

        if &exp.operator.as_ref().unwrap().operation.value() != &Operation::undefined.value() {
            res = format!(
                "(ComplexExpression: Operator: {1} {0} , ({2}))",
                res,
                comp_bin_oper,
                exp.extract_representation()
            );
        } else {
            if &exp_operation.value() != &Operation::undefined.value() {
                res = format!(
                    "(ComplexExpression: Operator: {1} ({0} , {2}))",
                    res,
                    comp_bin_oper,
                    exp.extract_representation()
                );
            }
        }
        res = format!("{0})", res);
        return res;
    }
}




pub fn generate_expressions(list_tokens:Vec<Token>)->Expression{
    let mut final_expression = Some(Expression::new());


    let mut expression = Some(Expression::new());

    let mut i = 0;

    let mut operator_counter:i8 = 0;

    for token in list_tokens {

        println!("{:?}", &token.t_rsttn());
        if operator_counter>=1{
            final_expression = Some(make_operation(Some(Box::new(final_expression.clone().unwrap())),expression.clone() ));
            expression = Some(Expression::new());

            operator_counter = 0;
        }else{

            let Token {_type,_value} = token;
            let mut operation:Operation = Operation::undefined;

            if &_type.unwrap().value() == &TokenTypes::PLUS.value(){
                operation = Operation::plus;
                operator_counter = operator_counter+1;
            }
            if &_type.unwrap().value() == &TokenTypes::MINUS.value(){
                operation = Operation::minus;
                operator_counter = operator_counter+1;
            }
            if &_type.unwrap().value() == &TokenTypes::MULTIPLY.value(){
                operation = Operation::multiply;
                operator_counter = operator_counter+1;
            }
            if &_type.unwrap().value() == &TokenTypes::DIVIDE.value(){
                operation = Operation::divide;
                operator_counter = operator_counter+1;
            }

            println!("{:?}", &_value);

            let v:i128 =(
                match _value{
                    Some(v)=>v,
                    None=>"0".to_string()
                }
            ).parse().unwrap();

            expression = Some(Expression{
                operator: Some(Operator { l_term: Value::int(v), r_term: Value::null("".to_string()), operation: operation }),
                exp_operation: Operation::undefined,
                expression: None,
            })
        }
    }

    return final_expression.unwrap();
}

pub fn make_operation(expression:Option<Box<Expression>>, to_add:Option<Expression>)->Expression{
    let mut current_exp = unbox(expression.unwrap());
    while  current_exp.expression.is_some() {
        current_exp = make_operation(current_exp.expression, to_add.clone());

        println!("Exito Code (0)");
    } 
    return current_exp;
}

pub struct Parser;

impl Parser {
    pub fn parse(tokens: Vec<lexer::structures::Token>) -> String {
        let mut tokes_to_parse = Expression::new();

        let mut last_type: TokenTypes = TokenTypes::UNDEFINED;
        let mut last_expression = Expression::new();
        let mut last_value = "".to_string();

        return generate_expressions(tokens).extract_representation();

        // // for token in tokens {
        // //     let Token { _type, _value } = token;
        // //     let tmp_token = match _type.clone(){
        // //         Some(v)=>v,
        // //         None=>TokenTypes::UNDEFINED
        // //     };

        // //     let tmp_val = match _value.clone(){
        // //         Some(v)=>v,
        // //         None=>"".to_string()
        // //     };
            

        // //     if (&tmp_token.value() != &TokenTypes::UNDEFINED.value()) {
        // //         if &last_type.value() == &TokenTypes::PLUS.value() {
        // //             let mut operation = Operation::undefined;

        // //             if tmp_token.value() == TokenTypes::PLUS.value() {
        // //                 operation = Operation::plus;
        // //             }
        // //             if tmp_token.value() == TokenTypes::MULTIPLY.value() {
        // //                 operation = Operation::multiply;
        // //             }
        // //             if tmp_token.value() == TokenTypes::DIVIDE.value() {
        // //                 operation = Operation::divide;
        // //             }
        // //             if tmp_token.value() == TokenTypes::MINUS.value() {
        // //                 operation = Operation::minus;
        // //             }
        // //             if &last_value.len()>&0{
        // //                 let number1: i128 = last_value.parse().unwrap();
        // //                 let mut number2: i128 = 0;
        // //                 if tmp_val.len() >0{
        // //                     number2 = tmp_val.parse().unwrap();
        // //                 }
                         
        // //                 tokes_to_parse.expression = Some(Box::new(Expression {
        // //                     operator: Some(Operator {
        // //                         l_term: Value::int(number2),
        // //                         r_term: Value::int(number1),
        // //                         operation: operation,
        // //                     }),
        // //                     exp_operation: Operation::undefined,
        // //                     expression: None,
        // //                 }));
        // //             }
                   
        // //         } else {
        // //             if _type.unwrap().value() == TokenTypes::PLUS.value() {
                        
        // //                 // let number1: i128 = last_value.parse().unwrap();
        // //                 // let number2: i128 = _value.clone().unwrap().parse().unwrap();


        // //                 tokes_to_parse.expression = Some(Box::new(Expression {
        // //                     operator: Some(Operator {
        // //                         l_term: Value::null("".to_string()),
        // //                         r_term: Value::null("".to_string()),
        // //                         operation: Operation::undefined,
        // //                     }),
        // //                     exp_operation: Operation::plus,
        // //                     expression: None,
        // //                 }));
        // //             }
        // //         }

        // //         // last_expression.expression = tokes_to_parse.expression.clone();
        // //     } else {
        // //     }

        // //     last_value = match _value{
        // //         Some(v)=>v,
        // //         None=>"".to_string()
        // //     };
        // //     last_type = match _type{
        // //         Some(v)=>v,
        // //         None=>TokenTypes::UNDEFINED
        // //     };
        // // }

        // let body = Expression {
        //     operator: Some(Operator {
        //         l_term: Value::int(1),
        //         r_term: Value::int(2),
        //         operation: Operation::plus,
        //     }),
        //     exp_operation: Operation::multiply,
        //     expression: Some(Box::new(Expression {
        //         operator: Some(Operator {
        //             l_term: Value::int(32),
        //             r_term: Value::null("".to_string()),
        //             operation: Operation::undefined,
        //         }),
        //         exp_operation: Operation::divide,
        //         expression: Some(Box::new(Expression {
        //             operator: Some(Operator {
        //                 l_term: Value::int(3),
        //                 r_term: Value::int(5),
        //                 operation: Operation::multiply,
        //             }),
        //             exp_operation: Operation::undefined,
        //             expression: None,
        //         })),
        //     })),
        // };

        // return body.extract_representation();

        
        // return tokes_to_parse.extract_representation();
    }
}

// 1+2
