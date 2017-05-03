import types from './utoActionTypes';

const initialState = {
  provinces: [],
  kingdoms: [],
  filterInfo: {
    myNwChecked: true,
    myKdNwChecked: false,
    myNw: 200000,
    myKdNw: 5000000,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90
  }
};

export const utoReducer = (state = initialState, action) => {
  const newState = state;

  switch (action.type) {
    case types.SET_UTOPIA_DATA:
      return { ...newState, provinces: action.provinces, kingdoms: action.kingdoms };
    case types.SET_FILTER_INFO:
      return { ...newState, filterInfo: { ...action } };
    default:
      return newState;
  }
};
