const CubicBezier = require('./CubicBezier');

module.exports = ({ a, b, c, d, length = 1000 }) => {
  length = parseInt(length);
  const CB = new CubicBezier([parseFloat(a), parseFloat(b)], [parseFloat(c), parseFloat(d)]);
  const result = [0];
  for (let i = 1; i < length + 1; i++) {
    result.push(parseFloat(CB.getY(i / length)).toFixed(3));
  }
  return result;
};
