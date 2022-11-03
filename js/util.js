const debounce = (callback, timeoutDelay) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const checkPriceInRange = (number, min, max) => min <= number && number <= max;

export { debounce, checkPriceInRange };
