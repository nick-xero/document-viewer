const express = require('express')

const {createFile,getFile,getAllFiles} = require('../libs/Files')
const router = express.Router();

router.post('/files',async (req,res)=>{
    console.log('creating file')
    const {username,filename,filetype} = req.body
    try{
    const {id} = await createFile({username,filename,filetype});
    res.send({id});
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.get('/file/:id',async (req,res)=>{
    const {id} = req.params
    try{
    const file = await getFile({id});
    res.send(file);
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

router.get('/files',async (req,res)=>{
    console.log('fetching all files')

    try{
    const files = await getAllFiles();
    res.send(files);
    }catch(err){
        res.status(400).send({message:err.message})
    }
})

module.exports=router;