

const express = require("express")
const { getTransactions } = require("../db/query.js")

const router = express.Router()

router.get("/",async (req,res)=>{

     let trans = await getTransactions()
     res.send(trans)
})

module.exports = router