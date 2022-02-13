import './FormComponent.css'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const FormComponent=(props)=>{

    const [name,setName] = useState("")
    const [status,setStatus] = useState(0)
    const [nameValid,setNameValid] = useState(false)
    
    const inputName = (event)=>{
        setName(event.target.value);
        setStatus(0);
    }

    const saveItem = (event)=>{
        event.preventDefault();
        const itemData = {
            id:uuidv4(),
            name:name,
            status:Number(status)
        }
        props.onAddItem(itemData);
        setName('');
        setStatus(0);
    }
    useEffect(()=>{
        if(name.trim().length > 0){
            setNameValid(true);
        }
    },[name])
    
    return(
       <div>
           <form onSubmit={saveItem}>
               <div className="form-control">
                    <label>Add new Todo List</label>
                    <input type="text" placeholder="Add new Todo List" onChange={inputName} value={name}/>
               </div>
               <div>
                   <button type="submit" className="btn-success" disabled={!nameValid}>Add</button>
               </div>
           </form>
       </div> 
    )
}

export default FormComponent