import React from 'react';

const CarList = ({ cars, handleCarClick }) => {
  return (
    <div className="car-list">
      <h3>Список автомобілів</h3>
      {cars.map(car => (
        <div className="car-item" key={car.id}>
          <div className="car-image">
            <img src={car.imageUrl} alt={car.name} />
          </div>
          <div className="car-details">
            <div className="car-header">
              <div>
                <h2>{car.name}</h2>
                <p className="manufacturer">{car.manufacturer}</p>
              </div>
              <div className="price-favorite">
                <p className="price">${car.price}</p>
              </div>
            </div>
            <div className="car-info">
              <span>Колір: {car.color}</span>
              <span>Об'єм: {car.volume} L</span>
              <span>Рік: {car.year}</span>
            </div>
            <button onClick={() => handleCarClick(car.id)} className="details-btn">Детальніше</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;