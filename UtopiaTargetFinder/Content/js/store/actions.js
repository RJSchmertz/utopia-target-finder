import request from 'superagent';
import types from './actionTypes';

export const setUtopiaData = (provinces, kingdoms) => ({
  type: types.SET_UTOPIA_DATA, provinces, kingdoms
});

export const getUtopiaData = () =>
  dispatch => {
    request
      .get('/Home/GetData')
      .set('Accept', 'application/json')
      .end((err, resp) => {
        if (err) console.log(err);
        else {
          console.log(resp.body);
          const provinces = resp.body.provinces;
          const kingdoms = resp.body.kingdoms;
          dispatch(setUtopiaData(provinces, kingdoms));
        }
      });
  };
