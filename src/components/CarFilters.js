import React from 'react';

const CarFilters = ({ filters, sortOrder, handleFilterChange, handleSortChange, handleClearFilters, applyFilters }) => {
  return (
    <div className="filters">
      <h3>Фільтри</h3>
      <div className="filter-inputs">
        <label>
          Виробник:
          <input type="text" name="manufacturer" value={filters.manufacturer} onChange={handleFilterChange} placeholder="Введіть виробника" />
        </label>
        <label>
          Рік випуску:
          <input type="text" name="year" value={filters.year} onChange={handleFilterChange} placeholder="Рік" />
        </label>
        <label>
          Колір:
          <input type="text" name="color" value={filters.color} onChange={handleFilterChange} placeholder="Колір" />
        </label>
        <label>
          Об'єм:
          <input type="text" name="volume" value={filters.volume} onChange={handleFilterChange} placeholder="Об'єм двигуна" />
        </label>
        <label>
          Ціна:
          <div className="price-range">
            <input type="text" name="priceFrom" value={filters.priceFrom} onChange={handleFilterChange} placeholder="Від" />
            <span> до </span>
            <input type="text" name="priceTo" value={filters.priceTo} onChange={handleFilterChange} placeholder="До" />
          </div>
        </label>
      </div>
      <button onClick={applyFilters} className="filter-btn">Застосувати фільтри</button>
      <button onClick={handleClearFilters} className="clear-btn">Очистити фільтри</button>
      <div className="sort-options">
        <label>
          Сортувати за:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="">Виберіть</option>
            <option value="price">Ціна</option>
            <option value="name">Назва (A-Я)</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default CarFilters;