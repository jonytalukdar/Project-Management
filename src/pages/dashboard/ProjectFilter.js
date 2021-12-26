import React from 'react';

const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'marketing',
  'sales',
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const filteredHandler = (filtered) => {
    changeFilter(filtered);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((f) => {
          return (
            <button
              key={f}
              onClick={() => filteredHandler(f)}
              className={currentFilter === f ? 'active' : ''}
            >
              {f}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectFilter;
