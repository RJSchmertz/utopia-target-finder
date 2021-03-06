import _ from 'lodash';
export const myNetworthRange = (provinces, myNw, low, high) =>
  _.filter(provinces,
    prov => prov.networth > myNw * 1000 * low
    && prov.networth < myNw * 1000 * high);

export const myLandRange = (provinces, myLand, low, high) =>
  _.filter(provinces,
    prov => prov.land > myLand * low
    && prov.land < myLand * high);

export const myKdNetworthRange = (provinces, myKdNw, low, high) =>
  _.filter(provinces,
    prov => prov.kingdomNetworth > myKdNw * 1000 * low
    && prov.kingdomNetworth < myKdNw * 1000 * high);

export const stance = (provinces, stances) =>
  _.filter(provinces,
    prov => _.includes(stances, prov.stance));

export const race = (provinces, races) =>
  _.filter(provinces,
    prov => _.includes(races, prov.race));
