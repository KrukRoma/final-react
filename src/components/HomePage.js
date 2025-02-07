import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCars, addCar, updateCar, deleteCar } from '../redux/carsSlice';
import './HomePage.css';
import CarFilters from './CarFilters';
import CarList from './CarList';
import CarDetails from './CarDetails';
import CarForm from './CarForm';
import AddCarForm from './AddCarForm';

const getNextId = () => {
  const currentId = parseInt(localStorage.getItem('currentId') || '4', 10);
  const nextId = currentId + 1;
  localStorage.setItem('currentId', nextId);
  return nextId;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

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
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    dispatch(setCars(savedCars));
  }, [dispatch]);
  
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
    dispatch(deleteCar(carId));
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
    dispatch(updateCar(formData));
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
    dispatch(addCar(newCar));
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