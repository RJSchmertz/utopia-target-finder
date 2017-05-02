import types from './actionTypes';

const initialState = {
  provinces: [],
  kingdoms: [],
  filters: {
    myNw: true,
    myKdNw: false
  }
};

export const reducer = (state = initialState, action) => {
  const newState = state;

  switch (action.type) {
    case types.SET_UTOPIA_DATA:
      return { ...newState, provinces: action.provinces, kingdoms: action.kingdoms };
    default:
      return newState;
  }
};
