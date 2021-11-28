import React, {useState, useEffect} from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
 
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

console.log("1")
function App() {
  console.log("2")
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show : false, msg : "", type : ""})

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("8")
    if(!name){
      showAlert(true, 'danger', 'please enter value');
    }else if(name && isEditing){
      setList(
        list.map((item) => {
          if (item.id === editID) {
           
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else{
    showAlert(true, 'success', 'item added to the list');
    const newItem = {id : new Date().getTime().toString(), title : name};
    setList([...list, newItem]);
    setName("");
    }
   
    
  };
 console.log("3")
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((list)=> list.id !== id ))
  }

  const editItem = (id) => {
    const specificItem = list.find((item)=>item.id ===id );
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({show, type, msg, });
   
  }
console.log("4")
useEffect(() => {
  console.log("6")
  localStorage.setItem('list', JSON.stringify(list));
  console.log("7")
}, [list]);


  return (
    <>
    {console.log("5")}
      <section className='section-center'>
          <form className='grocery-form' onSubmit={handleSubmit} >
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Grocery bud</h3>
          <div  className='form-control'>
            <input 
            type="text" 
            className='grocery'
            value={name} 
            placeholder="e.g. eggs" 
            onChange={(e)=>setName(e.target.value)}
            />
            <button type="submit" className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
            </button>
           
          </div>
          </form>
          {list.length > 0 && (
           
            <div className='grocery-container'>
              <List items={list} removeItem={removeItem} editItem={editItem} />
              <button className='clear-btn' onClick={clearList}>clear item</button>
            </div>
          )}
      </section>
    </>
  );
}

export default App;
