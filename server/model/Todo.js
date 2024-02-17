const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const User = require('./User');

const TodoSchema = new mongoose.Schema({

    createdBy: {
        type: ObjectId,
        ref: 'User'
    },

    item: [{
     content:{
        type: String,
        required: true,
        
    }, 

     completed: {
        type: Boolean,
        default: false
     },
     updatedAt:{
        type: Date,
        default: Date.now
     }
    }],
  
}, { timestamps: true });

module.exports = mongoose.model('TodoSch', TodoSchema);
