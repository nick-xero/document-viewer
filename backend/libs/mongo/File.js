const {Schema,model} = require('mongoose')
const {mongo} = require('./MongoConnection')

const fileSchema = new Schema({ 
    username: {type:'string',default:''},
     filename:{type:'string',default:''},
    filetype: {type:'string',default:''}
});
const File = mongo.model('File', fileSchema);

module.exports ={File}