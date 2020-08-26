import React, {useState, useEffect} from 'react';
import './index.css';
import Input from '../Input/input';
import {Button} from '../Button/button';
import TodoList from '../TodoList/list';
import Header from '../Header/header';
import Footer from '../Footer';
import Axios from 'axios';


const App = () => {
  const [newTask, setNewTasks] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [counters, setCounters] = useState({all: 0, active: 0, complete: 0});
  const [checkAll, setCheckAll] = useState(true);
  const enterNewTask = (e) => setNewTasks(e.target.value);

  useEffect( () => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await Axios.get('http://localhost:3003/todo')
    setTasks(todos.data)}
    // Для получения ресурсов
    fetchTodoAndSetTodos()
  }, [])

  const addNewTaskOnEnter = (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  // Добавление новой таски с условием, если строка не пустая
  const addNewTask = async () => {
    if (newTask !== ''){
      const createNewTodo = {title: newTask}
      const newTodo = await Axios.post('http://localhost:3003/todo/create', createNewTodo)
      setTasks([...tasks, newTodo.data]);}

    // Передаю объект на сервер (его св-ва)
//const hi = 'Привет';

   /* const hello = {title: 'hi my friend'}
   Дорожка:
    const hi = await Axios.post('http://localhost:3003/hi', hello)*/




    setNewTasks('');
  };

  // Счетчик

  const count = (_tasks = tasks) => {
    const result = {};
    const active = _tasks.filter((item) => !item.done).length;
    const all = _tasks.length;
    result.all = all;
    result.active = active;
    result.complete = all - active;
    setCounters(result);
  };

// Чек статус

  const changeTodoStatus = async (elem, check) => {
    const checked = check.target.checked;

    const changeOneStatus = {checked: checked}
    await Axios.patch('http://localhost:3003/check/' + elem._id, changeOneStatus)
      .then((res) => console.log(res))
      .catch(
        (err) => console.log(err))

    const changeOne = tasks.map((item) => (item._id === elem._id ? {...item, done: checked} : item));
    setTasks(changeOne);
  };

  // Кнопка чек олл. (Изменение чекнутых на обратные)

  const checked = async () => {
    setCheckAll(!checkAll);
    const ids = tasks.map((item) => item._id)

    const changeStatus = {ids: ids, checked: checkAll}
    await Axios.patch('http://localhost:3003/check', changeStatus)
      .then((res) => console.log(res))
      .catch(
        (err) => console.log(err))
    const test = tasks.map((item) => ({
      ...item,
      done: checkAll,
    }));
    setTasks(test)

    };

  // Хук: если меняются таксы, срабатывает счетчик

  useEffect(() => {
    count(tasks);
  }, [tasks]);

  useEffect(() => {
    console.log('2222');
    const result = getList();
    console.log(result);
    setShowTasks(result);
  }, [tasks, activeTab]);

  // Active tab для кнопок

  const getList = () => {
    console.log(tasks);
    return activeTab === 'active' || activeTab === 'complete'
      ? tasks.filter(el => activeTab === 'complete' ? el.done : !el.done) : tasks;
  };

  // Удаление

  const deleteTodo = async (id) => {

    // По параметрам айди ищет и приходит на бэк в индекс (в req)
    await Axios.delete('http://localhost:3003/todo/' + id)

    const filteredTodo = tasks.filter((elem) => id !== elem._id);
    setTasks(filteredTodo);
    count(filteredTodo);
  };

  // Кнопка делит олл комплит -> сервер

 /* const deleteAllComplete = async (id) => {*/
    /*await Axios.delete('http://localhost:3003)
    const filteredTodo = tasks.filter((elem) => id !== elem._id);
    setTasks(filteredTodo);
    count(filteredTodo);*/

    /*const fil = tasks.filter((elem) => elem.done);
    const */



    const deleteAllComplete = async () => {
      try{
        await Axios.delete('http://localhost:3003/deleteCompleted')
        // выполнив условия выше, идет на бэк. Там отображает выполненые (которые мы убрали), после чего выполняет
        // const todos = await Axios.get и показывает обновленный список тудух от бэка

        const todos = await Axios.get('http://localhost:3003/todo')
        setTasks(todos.data)
      } catch (e) {
        console.log('555555555555555555 ');
      }
    }


  const setActiveTabProps = event => {
    setActiveTab(event.target.id)
  };

  console.log(showTasks);

  //Создаю апдейт туду (для сохранения и передачи изменений) и принимаю его в листе
 const updateTodo = async (value, id) => {
   try{
     const editValue = {id: id, value: value}
     await Axios.put('http://localhost:3003/changes', editValue)
   } catch (e) {
     console.log('555555555555555555 ');
   }
 }

  return (
    <div className="todoapp">
              <Header
                addNewTaskOnEnter={addNewTaskOnEnter}
                addNewTask={addNewTask}
                enterNewTask={enterNewTask}
                checked={checked}
                newTask={newTask}
                checkAll={checkAll}
              />
              <TodoList
              todo={showTasks}
              deleteTodo={deleteTodo}
              changeTodoStatus={changeTodoStatus}
              updateTodo={updateTodo}
            />
            <Footer
              activeTab={activeTab}
              setActiveTab={setActiveTabProps}
              counters={counters}
              deleteAllComplete={deleteAllComplete}

              />


    </div>
  );
};

export default App;
