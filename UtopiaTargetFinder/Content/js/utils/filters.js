import _ from 'lodash';
export const myNetworthRange = (provinces, myNw, low, high) =>
  _.filter(provinces,
    prov => prov.networth > myNw * low
    && prov.networth < myNw * high);

export const myKdNetworthRange = (provinces, myKdNw, low, high) =>
  _.filter(provinces,
    prov => prov.kingdomNetworth > myKdNw * low
    && prov.kingdomNetworth < myKdNw * high);

export const stance = (provinces, stances) =>
  _.filter(provinces,
    prov => _.includes(stances, prov.stance));
