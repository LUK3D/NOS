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

        let _ast = ast::AST::new();

        // if results.errors.len()>0 {
        //     for error in &results.errors {
        //         print!("{0}",error.to_string());
        //     }
        // }else{
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
                }
                
                
                print!("{0}",token.t_rsttn());
                println!("\n");
            }
        // }
    }
    
    pub fn generate_branches(tokens:Branch){
        let tkn = match tokens.left{
            Some(v)=>v,
            None =>  Some(Branch::new())
        };

        if tokens.left.is_some() {
            Self::generate_branches(tkn);
        }
    }
}

fn unbox<T>(value:Box<T>)->T{
    *value
}


