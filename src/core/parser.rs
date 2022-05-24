#[path="lexer.rs"]
pub mod lexer;
use lexer::Lexer;
#[path="structures.rs"]
pub mod structures;
use structures::*;
pub struct Parser{
    pub tokens:lexer::structures::TokenResult 
}

impl Parser{
    
    pub fn parse(&self){
        let results = &self.tokens;

        if results.errors.len()>0 {
            for error in &results.errors {
                print!("{0}",error.to_string());
            }
        }else{
            for token in &results.tokens {
                print!("{0}",token.t_rsttn());
            }
        }
        println!("\n");
    }    
}

