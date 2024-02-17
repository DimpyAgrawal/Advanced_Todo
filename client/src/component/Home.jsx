import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function Home() {
  const notifySuccess = () => toast.success('Todo added successfully');
  const notifyInfo = (msg) => toast.info(msg);
  const notifyError = (msg) => toast.error(msg);

  const [addText, setAddText] = useState('');
  const [addele, setAddEle] = useState();

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  // const itemId = ;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/todo/GetTodos/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      console.log(response.data);
      setAddEle(response.data[0]);
    } catch (error) {
      notifyError('Error fetching todos');
      console.error('Error fetching todos', error);
    }
  };

  const submitAddList = async () => {
    // e.preventDefault();
    try {
      console.log('inside submitAddList');
      const response = await axios.post(
        `http://localhost:8080/todo/AddToDo/${id}`,
        { content: addText, completed: false },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      console.log(response.data);
      notifySuccess();
      const newItem = response.data; // Response should be the new todo item
      setAddEle([...addele, newItem]); // Add the new item to the list
      setAddText('');
      // notifySuccess();
    } catch (error) {
      notifyError('Error adding todo');
      console.error('Error in submitAddList', error);
    }
  };

  const handleEdit = async (e, itemId) => {
    e.preventDefault();
    const newText = prompt('Enter new text for the todo:');
    if (!newText) return;

    console.log(itemId + "  " + newText);
    try {
      const response = await axios.put(`http://localhost:8080/todo/EditTodo/${id}/${itemId}`,
        { content: newText, completed: false },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      console.log(response.data);
      notifyInfo('Todo Edited Successfully');
      setAddEle([...addele, response.data]);
      setAddText('');

    } catch (error) {
      notifyError('Todo not edited');
      console.log('Error in Edit todo', error);

    }
  }

  const handleCalander = (createdAt, updatedAt) => {
    console.log("time of a particular todo  createdAt ", createdAt);
    console.log("time of a particular todo updatedAt ", new Date(updatedAt).toLocaleString());

  }

  const handleDelete = async (itemId) => {
    console.log(itemId);
    try {
      const response = await axios.delete(`http://localhost:8080/todo/DeleteTodo/${id}/${itemId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      notifyInfo('Todo deleted successfully');
      console.log(response.data);


    } catch (error) {
      console.log('error while deleting particular todo');
    }
  }



  return (
    <div className='flex bg-[#bae6fd] w-[100vw] h-[92vh]'>
      <div className='flex flex-col w-[50vw] bg-white m-auto '>

        <input
          className='border-2 border-black'
          name='addtodo'
          value={addText}
          onChange={(e) => setAddText(e.target.value)}
          type="text"
          placeholder='Add to do'
        />
        <span className="material-symbols-outlined cursor-pointer" onClick={submitAddList}>add</span>
        <ul>
          <br />
          {console.log(addele)}
          {addele && addele.item.map((item, index) => (<>
            {/* {console.log(item)} */}
            <div className='flex '>
              <div>
                <h1>{item._id}</h1>
                <h1>{item.content}</h1>
              </div>
              <div className='mt-6 cursor-pointer'>
                <span className="material-symbols-outlined" onClick={(e) => handleEdit(e, item._id)}>edit</span>
                <span className="material-symbols-outlined" onClick={() => handleDelete(item._id)}>delete</span>
                {/* <a id="not-clickable"><span className="material-symbols-outlined" onClick={() => handleCalander(item.createdAt, item.updatedAt)}>calendar_month</span></a> */}
                {/* <Tooltip anchorSelect="#not-clickable">
                <p>Created at: {item.createdAt}</p>
                <p>Updated at: {new Date(item.updatedAt).toLocaleString()}</p>
              </Tooltip> */}
                <span className="material-symbols-outlined" onClick={() => handleCalander(item.createdAt, item.updatedAt)}>calendar_month</span>
              </div>
            </div>

            <br />
          </>
          ))}
        </ul>
      </div>
    </div>
  );
}
