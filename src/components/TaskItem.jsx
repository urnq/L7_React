import React, { useState, useRef, useEffect } from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  const statusMap = {
    'active': 'Активная задача',
    'completed': 'Задача выполнена',
    'cancelled': 'Задача отменена'
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = (field, value) => {
    setIsEditing(true);
    setEditField(field);
    setEditValue(value);
  };

  const handleBlur = () => {
    if (editValue.trim()) {
      onUpdate(task.id, { [editField]: editValue });
    }
    setIsEditing(false);
    setEditField(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const renderEditField = () => {
    if (editField === 'status') {
      return (
        <select
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
        >
          <option value="active">Активная задача</option>
          <option value="completed">Задача выполнена</option>
          <option value="cancelled">Задача отменена</option>
        </select>
      );
    }

    if (editField === 'deadline') {
      return (
        <input
          ref={inputRef}
          type="date"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      );
    }

    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
    );
  };

  return (
    <tr>
      <td onDoubleClick={() => handleDoubleClick('description', task.description)}>
        {isEditing && editField === 'description' ? renderEditField() : task.description}
      </td>
      <td onDoubleClick={() => handleDoubleClick('status', task.status)}>
        {isEditing && editField === 'status' ? renderEditField() : statusMap[task.status]}
      </td>
      <td onDoubleClick={() => handleDoubleClick('deadline', task.deadline)}>
        {isEditing && editField === 'deadline' ? renderEditField() : task.deadline}
      </td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>×</button>
      </td>
    </tr>
  );
}

export default TaskItem;