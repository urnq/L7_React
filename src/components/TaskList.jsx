import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Описание</th>
          <th>Статус</th>
          <th>Дедлайн</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;