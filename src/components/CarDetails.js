import React from 'react';

const CarDetails = ({ car, setShowDetails, handleDeleteCar, handleEditCar }) => {
  return (
    <div className="car-details-modal">
      <h3>Деталі автомобіля</h3>
      <img src={car.imageUrl} alt={car.name} className="detail-image" />
      <p><strong>Назва:</strong> {car.name}</p>
      <p><strong>Виробник:</strong> {car.manufacturer}</p>
      <p><strong>Рік випуску:</strong> {car.year}</p>
      <p><strong>Колір:</strong> {car.color}</p>
      <p><strong>Об'єм:</strong> {car.volume} L</p>
      <p><strong>Ціна:</strong> ${car.price}</p>
      <p><strong>Опис:</strong> {car.description}</p>
      <button onClick={() => setShowDetails(null)} className="back-btn">Назад</button>
      <button onClick={() => handleDeleteCar(car.id)} className="delete-btn">Видалити</button>
      <button onClick={() => handleEditCar(car.id)} className="edit-btn">Редагувати</button>
    </div>
  );
};

export default CarDetails;