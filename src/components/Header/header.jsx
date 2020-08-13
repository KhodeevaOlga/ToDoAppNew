import React from 'react'

import Input from '../Input/input'
import Checkbox from '../Checkbox/Checkbox'

const Header = ({ addNewTaskOnEnter, addNewTask, enterNewTask, checked, newTask }) => {
  return (

    <header className="header" onKeyDown={addNewTaskOnEnter}>
      <h1>todos</h1>
      <div className="input-container">
        <Checkbox
          id="toggle-all"
          type="checkbox"
          className="toggle-all"
          onClick={checked}
        />
        {/*<input id="toggle-all" type="checkbox" className="toggle-all" onClick={checked}/>*/}
        <label htmlFor="toggle-all" />
        <Input
          className="new-todo"
          placeholder="Add todo"
          addNewTask={addNewTask}
          enterNewTask={enterNewTask}
          newTask={newTask}
        />
      </div>
    </header>
  )
}

export default Header