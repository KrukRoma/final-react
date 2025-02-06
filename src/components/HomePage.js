import React, { useState, useEffect } from 'react';
import './HomePage.css';
import CarFilters from './CarFilters';
import CarList from './CarList';
import CarDetails from './CarDetails';
import CarForm from './CarForm';
import AddCarForm from './AddCarForm';

const initialCars = [
  { id: 1, name: 'Tesla Model S', manufacturer: 'Tesla', year: '2022', color: 'Red', volume: '100', price: '80000', description: 'Electric luxury sedan.', imageUrl: 'https://hdpic.club/uploads/posts/2022-01/1642748271_1-hdpic-club-p-tesla-krasnaya-1.jpg' },
  { id: 2, name: 'BMW M3', manufacturer: 'BMW', year: '2021', color: 'Blue', volume: '3.0', price: '70000', description: 'Sporty sedan with a turbo engine.', imageUrl: 'https://mediapool.bmwgroup.com/cache/P9/202103/P90414981/P90414981-the-new-bmw-m3-competiton-sedan-frozen-portimao-blue-metallic-03-2021-2250px.jpg' },
  { id: 3, name: 'Audi A4', manufacturer: 'Audi', year: '2020', color: 'Black', volume: '2.0', price: '40000', description: 'Compact luxury sedan.', imageUrl: 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1562244444/autoexpress/2017/05/1386808_a4-saloon-black-edition-optional-18-inch-wheel.jpg' },
  { id: 4, name: 'Mercedes-Benz S-Class', manufacturer: 'Mercedes-Benz', year: '2023', color: 'Silver', volume: '3.5', price: '90000', description: 'Premium sedan with advanced features.', imageUrl: 'https://i.infocar.ua/i/12/2817/1400x936.jpg' },
];

const getNextId = () => {
  const currentId = parseInt(localStorage.getItem('currentId') || '4', 10);
  const nextId = currentId + 1;
  localStorage.setItem('currentId', nextId);
  return nextId;
};

const HomePage = () => {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('cars');
    return savedCars ? JSON.parse(savedCars) : initialCars;
  });

  const [filteredCars, setFilteredCars] = useState(cars);
  const [filters, setFilters] = useState({
    manufacturer: '',
    year: '',
    color: '',
    volume: '',
    priceFrom: '',
    priceTo: '',
  });

  const [sortOrder, setSortOrder] = useState('');
  const [showDetails, setShowDetails] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    manufacturer: '',
    year: '',
    color: '',
    volume: '',
    price: '',
    description: '',
    imageUrl: '',
  });

  const [addingCar, setAddingCar] = useState(false);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const applyFilters = () => {
    let filtered = cars;

    if (filters.manufacturer) {
      filtered = filtered.filter(car => car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase()));
    }
    if (filters.year) {
      filtered = filtered.filter(car => car.year === filters.year);
    }
    if (filters.color) {
      filtered = filtered.filter(car => car.color.toLowerCase().includes(filters.color.toLowerCase()));
    }
    if (filters.volume) {
      filtered = filtered.filter(car => car.volume === filters.volume);
    }
    if (filters.priceFrom) {
      filtered = filtered.filter(car => parseFloat(car.price) >= parseFloat(filters.priceFrom));
    }
    if (filters.priceTo) {
      filtered = filtered.filter(car => parseFloat(car.price) <= parseFloat(filters.priceTo));
    }

    if (sortOrder) {
      filtered = [...filtered];
      if (sortOrder === 'price') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortOrder === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleClearFilters = () => {
    setFilters({
      manufacturer: '',
      year: '',
      color: '',
      volume: '',
      priceFrom: '',
      priceTo: '',
    });
    setSortOrder('');
    setFilteredCars(cars);
  };

  const handleCarClick = (carId) => {
    const car = cars.find(car => car.id === carId);
    setShowDetails(car);
  };

  const handleDeleteCar = (carId) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    setShowDetails(null);
  };

  const handleEditCar = (carId) => {
    const carToEdit = cars.find(car => car.id === carId);
    setEditingCar(carToEdit.id);
    setFormData({ ...carToEdit });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedCars = cars.map(car =>
      car.id === formData.id ? { ...formData } : car
    );
    setCars(updatedCars);
    setEditingCar(null);
    setFormData({
      id: null,
      name: '',
      manufacturer: '',
      year: '',
      color: '',
      volume: '',
      price: '',
      description: '',
      imageUrl: '',
    });
  };

  const handleAddCarFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCarFormSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      ...formData,
      id: getNextId(),
    };
    const updatedCars = [newCar, ...cars];
    setCars(updatedCars);
    setAddingCar(false);
    setFormData({
      id: null,
      name: '',
      manufacturer: '',
      year: '',
      color: '',
      volume: '',
      price: '',
      description: '',
      imageUrl: '',
    });
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Автомобільний каталог</h1>
        <p>Знайди свій ідеальний автомобіль серед кращих моделей.</p>
      </div>

      <CarFilters
        filters={filters}
        sortOrder={sortOrder}
        handleFilterChange={handleFilterChange}
        handleSortChange={handleSortChange}
        handleClearFilters={handleClearFilters}
        applyFilters={applyFilters}
      />

      {addingCar && (
        <AddCarForm
          formData={formData}
          handleAddCarFormChange={handleAddCarFormChange}
          handleAddCarFormSubmit={handleAddCarFormSubmit}
          setAddingCar={setAddingCar}
        />
      )}

      {!addingCar && (
        <button onClick={() => setAddingCar(true)} className="add-car-btn">Додати новий автомобіль</button>
      )}

      {showDetails && (
        <CarDetails
          car={showDetails}
          setShowDetails={setShowDetails}
          handleDeleteCar={handleDeleteCar}
          handleEditCar={handleEditCar}
        />
      )}

      {editingCar && (
        <CarForm
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          setEditingCar={setEditingCar}
        />
      )}

      {!showDetails && !editingCar && (
        <CarList
          cars={filteredCars}
          handleCarClick={handleCarClick}
        />
      )}
      
      <footer className="footer">
        <p>© 2025 Автомобільний каталог. Всі права захищені.</p>
        <p>Контакти: info@carcatalog.com | Телефон: +380 123 456 789</p>
        <div className="footer-links">
          <a href="#">Про нас</a>
          <a href="#">Політика конфіденційності</a>
          <a href="#">Умови використання</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;