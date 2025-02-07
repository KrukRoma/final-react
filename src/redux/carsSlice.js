import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
    updateCar: (state, action) => {
      const index = state.cars.findIndex(car => car.id === action.payload.id);
      if (index !== -1) {
        state.cars[index] = action.payload;
      }
    },
    deleteCar: (state, action) => {
      state.cars = state.cars.filter(car => car.id !== action.payload);
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar } = carsSlice.actions;
export default carsSlice.reducer;
