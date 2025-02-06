import React from 'react';

const AddCarForm = ({ formData, handleAddCarFormChange, handleAddCarFormSubmit, setAddingCar }) => {
  return (
    <div className="add-car-form">
      <h3>Додати новий автомобіль</h3>
      <form onSubmit={handleAddCarFormSubmit}>
        <label>
          Назва:
          <input type="text" name="name" value={formData.name} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Виробник:
          <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Рік випуску:
          <input type="text" name="year" value={formData.year} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Колір:
          <input type="text" name="color" value={formData.color} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Об'єм:
          <input type="text" name="volume" value={formData.volume} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Ціна:
          <input type="text" name="price" value={formData.price} onChange={handleAddCarFormChange} />
        </label>
        <label>
          Посилання на фото:
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleAddCarFormChange} placeholder="URL фото" />
        </label>
        <label>
          Опис:
          <textarea name="description" value={formData.description} onChange={handleAddCarFormChange}></textarea>
        </label>
        <button type="submit" className="save-btn">Додати автомобіль</button>
        <button type="button" onClick={() => setAddingCar(false)} className="cancel-btn">Скасувати</button>
      </form>
    </div>
  );
};

export default AddCarForm;