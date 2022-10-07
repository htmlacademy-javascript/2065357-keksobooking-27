function getRandomInteger(min, max) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFractNumber(min, max, decimalPlaces) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min || max < min) {
    return NaN;
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

const getRandomIndex = (arr) => getRandomInteger(0, arr.length - 1);
const transformImgNumber = (number) => number.toString().padStart(2, '0');

function getRandomLengthArray(arr) {
  const someValues = [];
  const lengthOfArray = getRandomInteger(1, arr.length);
  for (let i = 0; i < lengthOfArray; i++) {
    if (!someValues.includes(arr[i])) {
      someValues.push(arr[i]);
    }
  }
  return someValues;
}

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

export { getRandomInteger, getRandomFractNumber, getRandomIndex, transformImgNumber, getRandomLengthArray, createCounter };
