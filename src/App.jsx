import {useState} from 'react';
import './App.css';
import TableItem from "./components/TableItem.jsx";
import AddFrom from "./components/AddForm.jsx";

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'React1',
            state: 0,
            time: new Date(Date.now()).toLocaleString()
        },
        {
            id: 2,
            title: 'React2',
            state: 1,
            time: new Date(Date.now()).toLocaleString()
        },
        {
            id: 3,
            title: 'React3',
            state: 2,
            time: '02.06.2026'
        }
    ]);
    const addItemHandler = (item) => {
        let newId = -1
        tasks.map((item) => {
            newId = item.id
        })
        newId++;
        alert(JSON.stringify(item))
        item.id = newId;
        setTasks([...tasks, item]);
    }
    
    const [modalOpen, setModalOpen] = useState(true);
    const updateTaskState = (id, newState) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, state: newState} : task
            )
        );
    };

    const deleteTaskHandler = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };
    
   
    return (
        <>
            <div className='add-form-container' style={modalOpen === true ? {display: 'flex'} : {display: 'none'}}>
                <AddFrom modalActionHandler={setModalOpen} addItemHandler={addItemHandler} />
            </div>
            <header className='header'>
                <div className='menu-element'>Все задачи</div>
                <div className='menu-element'>Активные задачи</div>
                <div className='menu-element'>Выполненные задачи</div>
            </header>
            <main className='container'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th style={{width: '60%'}}>Описание</th>
                        <th style={{width: '20%'}}>Статус</th>
                        <th style={{width: '20%'}}>Дедлайны</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map(task => (
                        <TableItem
                            key={task.id}
                            item={task}
                            onStateChange={updateTaskState} // передаем функцию обновления
                            deleteTaskHandler={deleteTaskHandler}
                        />
                    ))}
                    </tbody>
                    <tfoot>
                    <tr style={{height: '70px'}}>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
                <button className='add-button' onClick={() => setModalOpen(true)}>
                    Добавить задачу
                </button>
                
            </main>
        </>
    );
}

export default App;
