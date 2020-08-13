import React from "react";

const Input = (props) => {
    const {enterNewTask, newTask, placeholder, className} = props;

    return (
      <input type="text" value={newTask} onChange={enterNewTask} placeholder={placeholder} className={className}/>
    )

}

export default Input;