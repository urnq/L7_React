import React from 'react';

function FilterTabs({ filter, setFilter }) {
  return (
    <div className="filter-tabs">
      <button 
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        Все задачи
      </button>
      <button 
        className={filter === 'active' ? 'active' : ''}
        onClick={() => setFilter('active')}
      >
        Активные задачи
      </button>
      <button 
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Выполненные задачи
      </button>
    </div>
  );
}

export default FilterTabs;