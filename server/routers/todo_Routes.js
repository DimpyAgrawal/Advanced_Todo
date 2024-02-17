const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../model/Todo');
const authenticate = require('../middleware/middleware');

// Define your routes here
router.post('/AddToDo/:id', async (req, res) => {
    const { content, completed} = req.body;
    const { id } = req.params;
    console.log('inside add route ' + id + " " + content);
    if (!content) return res.status(400).send({ message: 'Fill the content' });

    try { 
        let updatedTodo = await Todo.findOneAndUpdate( 
            { createdBy: id },
            {
                $push: {
                    item: {
                        content: content,
                        completed: completed, 
                        updatedAt: Date.now()
                    } 
                }
            },
            { new: true } 
        );

        if (!updatedTodo) {
            // If no Todo is found for the createdBy ID, create a new Todo for this user
            updatedTodo = await Todo.create({
                createdBy: id,
                item: [{
                    content: content,
                    completed: completed,
                    updatedAt: Date.now()
                }]
            });
        }

        return res.status(200).send('Item added successfully');
    } catch (error) {
        console.log('Error in addTodo route', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


router.get('/GetTodos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userTodos = await Todo.find({ createdBy: id }); 
        console.log(userTodos);

        if (!userTodos || userTodos.length === 0) {
            return res.status(404).send({ message: 'No todos found for this user' }); 
        }

        return res.status(200).send(userTodos);
    } catch (error) {
        console.log('Error in GetTodos API:', error);
        return res.status(500).send({ message: 'Internal Server Error' }); 
    }
});

router.put('/EditTodo/:id/:itemId', async (req, res) => {
    const { content } = req.body;
    const { id, itemId } = req.params;
    
    try {
        // Find the Todo document using createdBy ID and update the content of the specific item
        const updatedTodo = await Todo.findOneAndUpdate(
            { createdBy: id, 'item._id': itemId }, // Find the Todo document with createdBy ID and the item with itemId
            { $set: { 'item.$.content': content, 'item.$.updatedAt': Date.now() } }, // Update the content and updatedAt of the item
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send({ message: 'Todo or item not found' });
        }

        return res.status(200).send('Todo item updated successfully');
    } catch (error) {
        console.log('Error in todo edit route', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
 

router.delete('/DeleteTodo/:id/:itemId', async (req, res) => {
   
    const { id, itemId } = req.params;
    
    try {
        // Find the Todo document using createdBy ID and update the content of the specific item
        const updatedTodo = await Todo.findOneAndUpdate(
            { createdBy: id },
            {$pull:{item:{_id:itemId}}},
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send({ message: 'Todo or item not found' });
        }

        return res.status(200).send('Todo item Deleted successfully');
    } catch (error) {
        console.log('Error in todo delete route', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
// router.delete('/DeleteTodo/:id/:itemId', async (req, res) => {
//     const { id, itemId } = req.params;

//     try {
//         // Find the Todo document using createdBy ID and remove the specific item
//         const updatedTodo = await Todo.findOneAndUpdate(
//             { createdBy: id },
//             { $pull: { item: { _id: itemId } } }, // Remove the item with the specified itemId
//             { new: true }
//         );

//         if (!updatedTodo) {
//             return res.status(404).send({ message: 'Todo or item not found' });
//         }

//         return res.status(200).send('Todo item deleted successfully');
//     } catch (error) {
//         console.log('Error in todo delete route', error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// });



module.exports = router;  








