import request from 'superagent';
import types from './utoActionTypes';

export const setUtopiaData = (provinces, kingdoms, raceTypes, stanceTypes) => ({
  type: types.SET_UTOPIA_DATA, provinces, kingdoms, raceTypes, stanceTypes
});

export const setFilterInfo = filterInfo => ({
  type: types.SET_FILTER_INFO, filterInfo });

export const setHeaderOpen = headerOpen => ({
  type: types.SET_HEADER_OPEN, headerOpen
});

export const getUtopiaData = () =>
  dispatch => {
    request
      .get('/Home/GetData')
      .set('Accept', 'application/json')
      .end((err, resp) => {
        if (err) console.log(err); // eslint-disable-line no-console
        else {
          const provinces = resp.body.provinces;
          const kingdoms = resp.body.kingdoms;
          const raceTypes = resp.body.raceTypes;
          const stanceTypes = resp.body.stanceTypes;
          dispatch(setUtopiaData(provinces, kingdoms, raceTypes, stanceTypes));
        }
      });
  };
