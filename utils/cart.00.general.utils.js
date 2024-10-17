function findCartItemIndex(cart, cartItemID) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === cartItemID) {
      return i;
    }
  }
}

module.exports = {
  findCartItemIndex: findCartItemIndex
}