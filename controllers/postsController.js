const db= require('../config/connection')
const collection=require('../config/cllection')

exports.getPost=(req,res)=>{
    try {
       res.send("postAPI")
    } catch (error) {
        console.log(error);
        
    }
}