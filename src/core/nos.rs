use std::fs::File;
use std::io::{self, prelude::*, BufReader};
pub mod parser;
use parser::Parser;
use parser::lexer;

pub struct Nos{
    pub input:String
}

impl Nos{
     pub fn run(&self)->io::Result<()>{

        

        let file = File::open(self.input.to_string())?;
        let reader = BufReader::new(file);

        let mut tokens = lexer::Lexer::new();

        tokens.file_name = self.input.to_string();

        let mut result = lexer::structures::TokenResult::new();
        
        
        for line in reader.lines() {
            // println!("{:?}", line);
            tokens.current_text = line?.to_string();
            result.add(tokens.generate_tokens());
        }

        for token in &result.tokens {
            print!("{0}", token.t_rsttn());
        }

        if result.errors.len()>0{

            for err in result.errors {
                
                println!("\n{0}",err.to_string());
            }
        }else{
            println!("{0}",Parser::parse(result.tokens));
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





