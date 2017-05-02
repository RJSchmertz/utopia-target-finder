import _ from 'lodash';
export const myNetworthRange = (provinces, myNw, low, high) =>
  _.filter(provinces,
    prov => prov.networth > myNw * (low / 100)
    && prov.networth < myNw * (high / 100));

export const myKdNetworthRange = (provinces, myKdNw, low, high) =>
  _.filter(provinces,
    prov => prov.kingdomNetworth > myKdNw * (low / 100)
    && prov.kingdomNetworth < myKdNw * (high / 100));
