import React, {useState} from 'react';
import './index.css'

const TodoItem = (props) => {

  const {el, className} = props;
  const [read, setRead] = useState(true);
  const [value, setValue] = useState(el.title);


  const changeRead = () => {
    setRead(!read);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input onChange={handleChange} value={value} readOnly={read} onDoubleClick={changeRead} className={className}/*onKeyDown={handlerKeyDown}*//>
  ) ;
};


export default TodoItem;

