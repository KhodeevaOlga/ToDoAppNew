import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TodoItem from '../TodoItem/todoitem';
import {Button} from '../Button/button';
import './style.css';

function TodoList(props) {
  // Принимаю пропсы
  const {todo, deleteTodo, changeTodoStatus, updateTodo} = props;
  console.log(todo);

  return (

      <section className="main">
        <ul className="todo-list">

            {todo.map((el) => (
              <li key={el._id}>
                <Checkbox
                  className="toggle"
                  checked={el.done} onChange={(check) => {
                  changeTodoStatus(el, check)
                }}/>

                {/*Передаю пропсы. Апдейт переходит в файл айтем*/}
                <TodoItem
                  className="todo-title"
                  el={el}
                  updateTodo={updateTodo}/>
                <Button classNameProps='destroy' onClick={() => {deleteTodo(el._id)}}/>
              </li>)
            )}

        </ul>
      </section>

  );
}



export default TodoList;