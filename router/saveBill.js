
const express = require("express");
const { addTransaction, isUserExist, decrementAmount } = require("../db/query");

const router = express.Router();

const saveOthersTransaction = async (service,amount)=>{

    try{
     return await addTransaction(0,service,amount)
    }

    catch(err){
       return false;
    }
}

const saveStudentsTransaction = async (rollNo,service,amount)=>{

     let user = await isUserExist(rollNo)

     if(user){
         
       console.log(user)

       if(!user.gender)amount=0

       else{
           
           
           if(user.amount<amount){
              return null;
           }

           else 
           await decrementAmount(rollNo,user.amount,amount)

       }

       let isInserted = await addTransaction(rollNo,service,amount)
       
       if(!isInserted) return false;
       return isInserted
     }

     else return null;
}

router.post("/",async (req,res)=>{

    let type = req.body.type;
    console.log(req.body)

    if(type==0){

        let isInserted  = await saveOthersTransaction(req.body.service,req.body.amount)

        if(!isInserted) res.status(500).send("Internal Server error")
        else res.status(200).json(isInserted)
    }

    else{
      let isInserted = await saveStudentsTransaction(req.body.rollNo,req.body.service,req.body.amount)

      if(isInserted==null) res.status(401).send("Student not exist or Insufficient Balance")
      else if(!isInserted) res.status(500).send("Internal Server error")
      else res.status(200).json(isInserted)
  }


})

module.exports = router