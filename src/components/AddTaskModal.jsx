import React, { useState } from 'react';

function AddTaskModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: '',
    status: 'active',
    deadline: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Дедлайн обязателен';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onAdd(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить новую задачу</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Описание</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Введите описание"
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Статус</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Активная задача</option>
              <option value="completed">Задача выполнена</option>
              <option value="cancelled">Задача отменена</option>
            </select>
          </div>

          <div className="form-group">
            <label>Дедлайн</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            />
            {errors.deadline && <span className="error">{errors.deadline}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Добавить задачу</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;