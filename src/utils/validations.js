function wishlistCheck(whist) {
  try {
    if (!whist) {
      return false;
    }

    const whistConverted = JSON.parse(whist);

    return Array.isArray(whistConverted) && whistConverted.length > 0
      ? whistConverted
      : false;
  } catch {
    return false;
  }
}
module.exports = {
  wishlistCheck
}