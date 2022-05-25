/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ABSTRACT SYNTAX TREE                                                    │
  |-------------------------------------------------------------------------|
  | 24/05/2022 - @luk3d                                                     |
  └─────────────────────────────────────────────────────────────────────────┘
 */

pub enum BranchTypes {
    BinaryExpression,
    NumericLiteral,
    None
 }

  impl BranchTypes{
     /**Return the current value */
     pub fn value(&self) -> String {
         match *self {
             BranchTypes::BinaryExpression => "BinaryExpression".to_string(),
             BranchTypes::NumericLiteral => "NumericLiteral".to_string(),
             BranchTypes::None => "None".to_string(),
         }
     }
 }


pub struct Branch{
    pub _type:BranchTypes,
    pub value: Option<Value>,
    pub left:Option<Box<Branch>>,
    pub right:Option<Box<Branch>>
}

 impl Branch{
    pub fn new()->Branch{
        return  Branch{
            _type: BranchTypes::None,
            value:None,
            left:Some(Box::new(Branch { left: None, right: None, value:None, _type: BranchTypes::None })),
            right:Some(Box::new(Branch {  left: None, right: None, value:None, _type: BranchTypes::None }))
        }
    }
}

pub struct Value{
    pub string:String
}

impl Value{
    pub fn int(&self)->i128{
        let num: i128 = self.string.parse().unwrap();
        return num;
    }
    pub fn str(self)->String{
        return self.string;
    }

    pub fn float(&self)->f64{
        let num: f64 = self.string.parse().unwrap();
        return num;
    }

}


/** Abstract Syntax Tree */
pub struct AST{
    pub program:Vec<Branch>
}

impl AST{
    pub fn new() -> Vec<Branch>{
        return vec![];
    }
}