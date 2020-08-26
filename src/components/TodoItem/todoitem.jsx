import React, {useState} from 'react';
import './index.css'

const TodoItem = (props) => {

  const {el, className, updateTodo} = props;

  const [read, setRead] = useState(true);
  const [value, setValue] = useState(el.title);
  const [editId, setEditId] = useState(el.title);


  const handlerKeyDown = (e) => {
    if (e.which === 13) {
      setRead(true);
      updateTodo(value, editId);
    }
  }

  const _changeRead = () => {
    changeRead(el._id)
  }


  const changeRead = (e) => {
    setRead(false);
    setEditId(e)
  };

  const handlerBlur = () => {
    setRead(true)
    updateTodo(value);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };


  return (
    <input onChange={handleChange} value={value} readOnly={read} onBlur={handlerBlur} onDoubleClick={_changeRead}  className={className} onKeyDown={handlerKeyDown}/>
  ) ;
};


export default TodoItem;

