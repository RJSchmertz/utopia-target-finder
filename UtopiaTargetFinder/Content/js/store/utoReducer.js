import types from './utoActionTypes';

const initialState = {
  provinces: [],
  kingdoms: [],
  headerOpen: false,
  filterInfo: {
    myNwChecked: true,
    myKdNwChecked: false,
    stanceChecked: false,
    myNw: 200,
    myKdNw: 5000,
    provLow: 0.85,
    provHigh: 1.10,
    kdLow: 0.50,
    kdHigh: 0.90,
    includeStances: Array(1).fill(0)
  }
};

export const utoReducer = (state = initialState, action) => {
  const newState = state;

  switch (action.type) {
    case types.SET_UTOPIA_DATA:
      return {
        ...newState,
        provinces: action.provinces,
        kingdoms: action.kingdoms,
        raceTypes: action.raceTypes,
        stanceTypes: action.stanceTypes
      };
    case types.SET_FILTER_INFO:
      return { ...newState, filterInfo: { ...action.filterInfo } };
    case types.SET_HEADER_OPEN:
      return { ...newState, headerOpen: action.headerOpen };
    case types.SET_RACE_TYPES: {
      return { ...state, raceTypes: action.raceTypes };
    }
    default:
      return newState;
  }
};
