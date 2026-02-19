import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'
import AddTaskModal from './components/AddTaskModal'
import FilterTabs from './components/FilterTabs'
import tasksData from './data/tasks.json'

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTasks(tasksData.tasks)
  }, [])

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => task.status === 'active')
      case 'completed':
        return tasks.filter(task => task.status === 'completed' || task.status === 'cancelled')
      default:
        return tasks
    }
  }

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask
    }
    setTasks([...tasks, task])
    setIsModalOpen(false)
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ))
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1>Vite + React + Todo App</h1>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>


      <div className="todo-section">
        <h2>Мой список задач</h2>
        
        <FilterTabs filter={filter} setFilter={setFilter} />
        
        <TaskList 
          tasks={getFilteredTasks()}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
        
        <button className="add-button" onClick={() => setIsModalOpen(true)}>
          Добавить задачу
        </button>

        {isModalOpen && (
          <AddTaskModal 
            onClose={() => setIsModalOpen(false)}
            onAdd={addTask}
          />
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App