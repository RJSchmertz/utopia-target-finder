import _ from 'lodash';
export const myNetworthRange = (arr, myNw, low, high) =>
  _.filter(arr,
    o => o.networth > myNw * (low / 100)
    && o.networth < myNw * (high / 100));

export const myKdNetworthRange = (arr, myKdNw, low, high) =>
  _.filter(arr,
    o => o.kingdomNetworth > myKdNw * (low / 100)
    && o.kingdomNetworth < myKdNw * (high / 100));
