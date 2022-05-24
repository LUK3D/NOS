use std::io::Write;
use std::io::stdin;
use std::fs;
use std::env;
use clearscreen::clear;


#[path = "core/nos.rs"]
mod nos;
use nos::Nos;


fn main() {

   
    loop{
        print!("{{nos}}-> ");
        let mut input_string =  read_input();
        //-------------------------------------------------------
        if input_string.replace("\n", "") == "limpar"{
            clear_screen();
        }else{
            let nos = Nos{input:input_string};
            nos.run();
        }
    }
}




fn readFile (path:&str)->String{
let mut source:String = "".to_string();
source = fs::read_to_string(path).expect("Não foi possível carregar o arquivo");
return source;
}

pub fn read_input()->String{
        std::io::stdout().flush();
        let mut string: String = String::new();
        std::io::stdin().read_line(&mut string);
        return string.trim().to_string();
}

pub fn clear_screen(){
    clear().expect("failed to clear screen");
}

pub fn  read_agrs()->Vec<String>{
    let args: Vec<String> = env::args().collect();
    return args;
}