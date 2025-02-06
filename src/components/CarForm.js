import React from 'react';

const CarForm = ({ formData, handleFormChange, handleFormSubmit, setEditingCar }) => {
  return (
    <div className="edit-form">
      <h3>Редагувати автомобіль</h3>
      <form onSubmit={handleFormSubmit}>
        <label>
          Назва:
          <input type="text" name="name" value={formData.name} onChange={handleFormChange} />
        </label>
        <label>
          Виробник:
          <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleFormChange} />
        </label>
        <label>
          Рік випуску:
          <input type="text" name="year" value={formData.year} onChange={handleFormChange} />
        </label>
        <label>
          Колір:
          <input type="text" name="color" value={formData.color} onChange={handleFormChange} />
        </label>
        <label>
          Об'єм:
          <input type="text" name="volume" value={formData.volume} onChange={handleFormChange} />
        </label>
        <label>
          Ціна:
          <input type="text" name="price" value={formData.price} onChange={handleFormChange} />
        </label>
        <label>
          Посилання на фото:
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange} placeholder="URL фото" />
        </label>
        <label>
          Опис:
          <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>
        </label>
        <button type="submit" className="save-btn">Зберегти зміни</button>
        <button type="button" onClick={() => setEditingCar(null)} className="cancel-btn">Скасувати</button>
      </form>
    </div>
  );
};

export default CarForm;