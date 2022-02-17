const {File} = require('./mongo/File');

async function createFile({username,filename,filetype}){
    const file = new File({username,filename,filetype})
    await file.save()
    return {id:file._id}
}

async function getFile({id}){
    const doc = await File.findOne({id});
    return doc
}

async function getAllFiles(){
    const docs = await File.find();
    return docs
}

module.exports={createFile,getFile,getAllFiles}