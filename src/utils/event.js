export const Debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

export const Throttle = (func, wait, mustRun) => {
  if (!mustRun) mustRun = wait * 2;

  let timeout;
  let startTime = new Date();

  return function() {
    const context = this;
    const args = arguments;
    const curTime = new Date();

    clearTimeout(timeout);
    if (curTime - startTime >= mustRun) {
      func.apply(context, args);
      startTime = curTime;
    } else {
      timeout = setTimeout(func, wait);
    }
  };
};
