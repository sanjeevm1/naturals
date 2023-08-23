
const Transaction = require("./tables/Transaction.js")
const Student = require("./tables/Student.js")

async function addTransaction(rollNo,service,amount){

    
    return await Transaction.create({
        date : new Date(),
        amount:amount,
        rollNo:rollNo,
        service:service
    })
    
}

async function isUserExist(rollNo){

    let user = await Student.findOne({
        where:{
            rollNo:rollNo
        }
    })

    if(user==null)return false;
    return user.dataValues;

}

async function getTransactions(){

    let trans = await Transaction.findAll()

    if(trans==null)return false;

    let transData = []
    
    for(let temp of trans){
        transData.push(temp.dataValues)
    }

    return transData

}

async function decrementAmount(rollNo,balance,amount){

    let user = await Student.update({
        amount:balance-amount
    },{
        where:{rollNo:rollNo}
    })

    console.log(user)

}

module.exports = { addTransaction , isUserExist , getTransactions , decrementAmount}