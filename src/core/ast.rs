/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ABSTRACT SYNTAX TREE                                                    │
  │-------------------------------------------------------------------------│
  │ 24/05/2022 - @luk3d                                                     │
  └─────────────────────────────────────────────────────────────────────────┘
 */
#[derive(Debug)]
#[derive(Copy, Clone)]
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

     pub fn compare(&self, to:BranchTypes)->bool{
         return self.value() == to.value();
     }
 }
 #[derive(Debug)]
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

    pub fn copy(self)->Branch{
        return Branch {
            _type:self._type,
            value:self.value,
            left:self.left,
            right:self.right
        };
    }
    /// Branch Representation
    pub fn b_rsttn(&self, branch:Option<&Branch>) -> String{
        // let def_str:String = "".to_string();

        let _branch = match branch{
            Some(v)=>v,
            None=>&self
        };

        if _branch._type.value() != BranchTypes::None.value(){

            
            let _none = Box::new(Branch::new());
             let left = match &_branch.left{
                 Some(l)=>l,
                 None =>&_none
                };
                
                let right = match &_branch.right{
                    Some(l)=>l,
                    None => &_none
                };
                
            let mut final_node =  "".to_string();

            let mut lnode = "".to_string();
            if left._type.value() == BranchTypes::BinaryExpression.value(){
                lnode = Self::b_rsttn(&self,Some(left));
            }else{
                lnode = left._type.value(); 
            }
            
            let mut rnode = "".to_string();
            if left._type.value() == BranchTypes::BinaryExpression.value(){
                rnode = Self::b_rsttn(&self,Some(left));
            }else{
                rnode = left._type.value(); 
            }


            println!("{0} <-> {1}", lnode,rnode);


            
            if lnode.len()>0{
                final_node = format!("({0})",lnode)
            }
            if rnode.len()>0{
                final_node = format!("({0}({1}))",final_node,rnode)
            }

            return format!("({0}{1})",_branch._type.value(),final_node);
        }else{
            return "".to_string();

            // let left = match self.left{
            //     Some(l)=>l,
            //     None => Box::new(Branch::new())
            // };

            // let right = match self.right{
            //     Some(l)=>l,
            //     None => Box::new(Branch::new())
            // };

            // let mut lnode = "".to_string();
            // let mut rnode = "".to_string();
            // if unbox(left)._type.value() != BranchTypes::None.value(){
            //     lnode = unbox(left)._type.value();
            // }
            // if unbox(right)._type.value() != BranchTypes::None.value(){
            //     rnode = unbox(right)._type.value();
            // }
            // return format!("(({0}),({1}))",lnode,rnode);
        }
    }
}

#[derive(Debug)]
pub struct Value{
    pub string:String
}

impl Value{

    pub fn copy(self)->Value{
        return Value{
            string:self.string
        };
    }
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
    pub fn null()->i8{
        let num: i8 = 0;
        return num;
    }

}


/** Abstract Syntax Tree */
#[derive(Debug)]
pub struct AST{
    pub program:Vec<Branch>
}

impl AST{
    pub fn new() -> AST{
        return AST{
            program:vec![]
        };
    }
}

fn unbox<T>(value:Box<T>)->T{
    *value
}
