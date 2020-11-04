const  express = require("express");
const Router = express.Router();
const mongoose = require('mongoose');
const userManager = require('../models/user_info')

// list usẻ function ----------------------------------------------------------------
Router.get('/',(req,res)=>{{
    userManager.find()
        .select('name dateofbirth mobile_phone gender create_at _id')
        .exec()
        .then(docs=>{
            const response = {
                count: docs.length,
                user_info: docs.map(doc=>{
                    return{
                        name:doc.name,
                        dateofbirth:doc.dateofbirth,
                        mobile_phone:doc.mobile_phone,
                        gender:doc.gender,
                        create_at:doc.create_at,
                        _id:doc._id,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
}})

// get user ID  ----------------------------------------------------------------
Router.get('/:id',(req, res)=>{
    userManager.findById(req.params.id) // param la lay id o tren ||  findById : la lay id
        .select('name dateofbirth mobile_phone gender create_at _id')
        .exec()
        .then(docs=>{
            if(docs){
                
                res.status(200).json({userInfo:docs,message:'success'});
            }
            
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
})

// delete user function ----------------------------------------------------------------
Router.delete('/:userinfoId',(req, res)=>{
    userManager.findByIdAndRemove(req.params.userinfoId,function(err, user){
        if(err) return res.status(500).json({error:err})
        else res.status(200).json({message:'success'})
    })
})
module.exports =Router;





