import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TodoItem from '../TodoItem/todoitem';
import {Button} from '../Button/button';
import './style.css';

function TodoList(props) {
  const {todo, deleteTodo, changeTodoStatus} = props;
  //console.log(todo);

  return (

      <section className="main">
        <ul className="todo-list">

            {todo.map((el) => (
              <li key={el.id}>
                <Checkbox
                  className="toggle"
                  checked={el.done} onChange={(check) => {
                  changeTodoStatus(el, check)
                }}/>

                <TodoItem
                  className="todo-title"
                  el={el}/>
                <Button classNameProps='destroy' onClick={() => {deleteTodo(el.id)}}/>
              </li>)
            )}

        </ul>
      </section>

  );
}



export default TodoList;