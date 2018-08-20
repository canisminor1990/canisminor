export default title => {
  if (title) {
    document.title = `${title} - CanisMinor`;
  } else {
    document.title = `CanisMinor`;
  }
};
