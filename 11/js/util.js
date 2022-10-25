const getRandomInteger = (min, max) => {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFractNumber = (min, max, decimalPlaces) => {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
};

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];
const transformImgNumber = (number) => number.toString().padStart(2, '0');

const getRandomLengthArray = (arr) => {
  const someValues = [];
  const lengthOfArray = getRandomInteger(1, arr.length);
  for (let i = 0; i < lengthOfArray; i++) {
    if (!someValues.includes(arr[i])) {
      someValues.push(arr[i]);
    }
  }
  return someValues;
};

export { getRandomInteger, getRandomFractNumber, getRandomArrayElement, transformImgNumber, getRandomLengthArray };
