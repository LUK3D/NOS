use std::fs::File;
use std::io::{self, prelude::*, BufReader};
mod parser;
use parser::Parser;

pub struct Nos{
    pub input:String
}

impl Nos{
     pub fn run(&self)->io::Result<()>{

        let file = File::open(self.input.to_string())?;
        let reader = BufReader::new(file);
        let mut l =   parser::lexer::Lexer::new();

        for line in reader.lines() {
            // println!("{:?}", line);
            l.current_text = line?.to_string();
            let  p = Parser{
            tokens:l.generate_tokens()
            };
            p.parse();
        }
        Ok(())
     }
}





