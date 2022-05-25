#[path="lexer.rs"]
pub mod lexer;
use lexer::Lexer;
#[path="structures.rs"]
pub mod structures;
use structures::*;

#[path="ast.rs"]
pub mod ast;
use ast::Branch;
use ast::BranchTypes;
use ast::Value;




pub struct Parser{
    pub tokens:lexer::structures::TokenResult 
}

impl Parser{
    
    pub fn parse(&self){
        let results = &self.tokens;

        let mut _ast = ast::AST::new();

        // if results.errors.len()>0 {
        //     for error in &results.errors {
        //         print!("{0}",error.to_string());
        //     }
        // }else{

            
            let mut last_brach = &Branch::new();

            for token in &results.tokens {

                let mut branch = Branch::new();
                let token_value =  match &token._value {
                    Some(v)=>v,
                    None => ""
                };
                let token_type =  match &token._type {
                    Some(v)=>v,
                    None => &lexer::structures::TokenTypes::UNDEFINED
                };


                if token_type.value() ==  lexer::structures::TokenTypes::FLOAT.value() {
                    let final_val = Value{string: token_value.to_string()};
                    branch.value = Some(final_val);
                    branch._type = BranchTypes::NumericLiteral;
                    last_brach = &branch;
                }else{
                    if token_type.value() ==  lexer::structures::TokenTypes::PLUS.value() {
                        if last_brach._type.compare(BranchTypes::NumericLiteral){
                            last_brach.left = Some(Box::new(Branch{ //TODO ---------------------------------
                                _type:BranchTypes::NumericLiteral,
                                value:last_brach.value
                                left:None,
                                right:branch
                                
                            }));
                        }else{
                            let final_val = Value{string: token_value.to_string()};
                            last_brach.value = Some(final_val);
                        }
                        
                    }else{
                        
                       
                    }
                }
                
                
               
                
                print!("{0}",token.t_rsttn());
                println!("\n");
            }
        // }
    }
    
    pub fn generate_branches(tokens:Option<Branch>)-> Branch {

        let tmp_branch = match tokens{
            Some(v)=>v,
            None=> Branch::new()
        };
        

        let mut left_branch:Branch = Branch::new();
        let mut right_branch:Branch = Branch::new();
        
        if tmp_branch.left.is_some() {
            let b =  unbox(Some(tmp_branch.left.unwrap()).unwrap());
            left_branch = Self::generate_branches(Some(b));
        }

        if tmp_branch.right.is_some() {
            let b =  unbox(Some(tmp_branch.right.unwrap()).unwrap());
            right_branch = Self::generate_branches(Some(b));
        }

        if tmp_branch._type.value() == BranchTypes::BinaryExpression.value(){
            let lv = match left_branch.value{
                Some(v)=>v,
                None =>Value{
                    string:"".to_string()
                }
            };
            let rv = match right_branch.value{
                Some(v)=>v,
                None =>Value{
                    string:"".to_string()
                }
            };

            return Branch{
                    _type:BranchTypes::BinaryExpression,
                    left:None,
                    right:None,
                    value:Some(Value{
                        string:format!("{0}", lv.float() + rv.float())
                    })
            }
        }else {
            if tmp_branch._type.value() == BranchTypes::NumericLiteral.value(){
                let mut nbrach = Branch::new();
                nbrach._type = tmp_branch._type;
                nbrach.value = tmp_branch.value;

                return nbrach;
            }else{
                return Branch::new()
            }
        }
            
    
        
    }
}

fn unbox<T>(value:Box<T>)->T{
    *value
}


