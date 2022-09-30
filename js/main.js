// подсмотрел функцию на https://schoolsw3.com/js/js_random.php
function getRandomInteger(min, max) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min) {
    return NaN;
  }

  if (max < min) {
    const reverse = max;
    max = min;
    min = reverse;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInteger(1, 15);

// Функция, возвращающая число с указанным количеством знаков после запятой.
function getRandomFractNumber(min, max, decimalPlaces) {

  if (Math.sign(max) === -1 || Math.sign(min) === -1 || max === min) {
    return NaN;
  }

  if (max < min) {
    const reverse = max;
    max = min;
    min = reverse;
  }

  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}

getRandomFractNumber(1.1, 1.2, 3);
