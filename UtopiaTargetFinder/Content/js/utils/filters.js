import _ from 'lodash';
export const myNetworthRange = (provinces, myNw, low, high) =>
  _.filter(provinces,
    prov => prov.networth > myNw * 1000 * low
    && prov.networth < myNw * 1000 * high);

export const myKdNetworthRange = (provinces, myKdNw, low, high) =>
  _.filter(provinces,
    prov => prov.kingdomNetworth > myKdNw * 1000 * low
    && prov.kingdomNetworth < myKdNw * 1000 * high);

export const stance = (provinces, stances) =>
  _.filter(provinces,
    prov => _.includes(stances, prov.stance));
