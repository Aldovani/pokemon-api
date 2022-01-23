  const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
 const randomNumberFloat = (min, max) => {
  return (Math.random() * (max - min + 1) + min).toFixed(2);
};


module.exports = {
  randomNumber, 
}