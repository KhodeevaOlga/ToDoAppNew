import React, {useState, useEffect} from 'react';
import './index.css';
import Input from '../Input/input';
import {Button} from '../Button/button';
import TodoList from '../TodoList/list';
import Header from '../Header/header';


const App = () => {
  const [newTask, setNewTasks] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [counters, setCounters] = useState({all: 0, active: 0, complete: 0});
  const [checkAll, setCheckAll] = useState(true);
  const enterNewTask = (e) => setNewTasks(e.target.value);

  const addNewTaskOnEnter = (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  // Добавление новой таски с условием, если строка не пустая
  const addNewTask = () => {
    if (newTask !== '')
      setTasks([
        ...tasks,
        {id: Math.random(), title: newTask, done: false}
      ]);

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

  // Кнопка чек олл. (Вторая строчка меняет все чекнутые на обратные)

  const checked = () => {
    setCheckAll(!checkAll);
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

  const deleteTodo = (id) => {

    const filteredTodo = tasks.filter((elem) => id !== elem.id);

    setTasks(filteredTodo);
    count(filteredTodo);
  };
  const deleteAllComplete = () => {

    const filteredCompleteTodo = tasks.filter((elem) => !elem.done);

    setTasks(filteredCompleteTodo);
    count(filteredCompleteTodo);
  };
  const changeTodoStatus = (elem, check) => {
    const checked = check.target.checked;
    const changeOne = tasks.map((item) => (item.id === elem.id ? {...item, done: checked} : item));
    setTasks(changeOne);
  };

  console.log(showTasks);
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
            />



      <div className="footer">
        <ul className="tabs-select">
          <div className="button1">
              <div className={'tab-select-item' + (activeTab === 'all' ? ' active' : '')} onClick={() => {
                console.log('111');
                setActiveTab('all');
              }}>All({counters.all})
              </div>
              <div className={'tab-select-item' + (activeTab === 'active' ? ' active' : '')} onClick={() => {
                setActiveTab('active');
              }}>Active ({counters.active})
              </div>
              <div className={'tab-select-item' + (activeTab === 'complete' ? ' active' : '')} onClick={() => {
                console.log('Я в комплит');

                setActiveTab('complete');
              }}>Complete({counters.complete})
              </div>
          </div>


          <div className="button2">
            <Button classNameProps="btnClear" nameButton='Clear completed'
                    onClick={deleteAllComplete}/>
          </div>

        </ul>

      </div>

    </div>
  );
};

export default App;
