export default texts => {
  texts = texts.split(/\|/g);
  return texts.map((item, i) => [item, <br key={i} />]);
};
