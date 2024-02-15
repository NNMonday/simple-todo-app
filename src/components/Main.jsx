import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

export default function Main() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
  const [inputValue, setInputValue] = useState('');
  const [displayList, setDisplayList] = useState([...todoList])

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    setDisplayList([...todoList])
  }, [todoList])

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue !== '') {
      const todoObj = {
        taskName: inputValue,
        isDone: false
      }
      setTodoList([...todoList, todoObj])
    } else {
      console.log('empty');
    }
    setInputValue('')
  }

  const changeStatus = (e, t, i) => {
    const status = !t.isDone
    const newList = [...todoList]
    newList[i] = {
      ...t,
      isDone: status
    }
    setTodoList(newList)
  }

  const deleteTask = (i) => {
    const newList = [...todoList];
    newList.splice(i, 1);
    setTodoList(newList)
  }

  const filterStatus = (e) => {
    const status = e.target.value
    switch (status) {
      case 'todo': {
        setDisplayList(todoList.filter((t) => { return !t.isDone }))
        break;
      }
      case 'done': {
        setDisplayList(todoList.filter((t) => { return t.isDone }))
        break;
      }
      default: {
        setDisplayList([...todoList]);
        break;
      }
    }
  }

  return (
    <div className='main-container'>
      <div className='main'>
        <form onSubmit={addTodo}>
          <div className='input'>
            <div className='input-field'>
              <input value={inputValue} type="text" onChange={e => setInputValue(e.target.value)} className='h-100 p-3 w-100' style={{ border: '2px solid #fbbf24', borderRadius: '10px' }} />
            </div>
            <div className='add-btn-container'>
              <button type='submit' style={{ width: '70px', backgroundColor: '#10b981' }}>
                <i className="fa-solid fa-plus fa-xl"></i>
              </button>
            </div>
          </div>
        </form>
        <Row>
          <Col>
            <div className='rounded-3 shadow-sm p-4' style={{ minHeight: '500px', backgroundColor: '#fef3c7' }}>
              <div className='d-flex justify-content-between'>
                <span style={{ fontSize: '1.5em', color: '#b4533a' }}>List:</span>
                <select className='p-1 rounded-2' name="status" onChange={filterStatus}>
                  <option value="all" defaultValue={true}>All</option>
                  <option value="todo">Todo</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className='todoList mt-3'>
                {displayList.map((t, i) => {
                  return (
                    <Row className='todo' key={i}>
                      <Col xs={11}>
                        <div className={t.isDone ? 'task-name done' : 'task-name'} style={{ maxWidth: '98%' }} onClick={(e) => changeStatus(e, t, i)}>
                          {i + 1}. {t.taskName}
                        </div>
                      </Col>
                      <Col xs={1}>
                        <i className="fa-solid fa-trash trash-icon" onClick={() => { deleteTask(i) }}></i>
                      </Col>
                    </Row>
                  )
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
