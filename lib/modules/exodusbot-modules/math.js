//some useful functions we needed
class exodus_math{
  constructor(){};
  static getRandomInt(max, min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  static timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    return a.toDateString();
  }
}
module.exports = exodus_math;
