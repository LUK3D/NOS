use std::fs::File;
use std::io::{self, prelude::*, BufReader};
mod parser;
use parser::Parser;
mod lexer;

pub struct Nos{
    pub input:String
}

impl Nos{
     pub fn run(&self)->io::Result<()>{

        println!("{0}",Parser::parse());
        

        let file = File::open(self.input.to_string())?;
        let reader = BufReader::new(file);

        let mut tokens = lexer::Lexer::new();

        let mut result = lexer::structures::TokenResult::new();
        

        for line in reader.lines() {
            // println!("{:?}", line);
            tokens.current_text = line?.to_string();
            result.add(tokens.generate_tokens());
        }

        for token in result.tokens {
            print!("{0}", token.t_rsttn());
        }

        // let  p = Parser{
        //     tokens:tokens
        // };

        // // let generated = Parser::generate_branches(Some());

        // // println!("{:?}", p.parse());
        
        // for elem in p.parse().program {
        //     println!("{0}",elem.b_rsttn(None));
        // }
        Ok(())
     }
}





