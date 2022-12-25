/* eslint-disable max-lines-per-function */
// create tool objects
// add emthods within objects
function createProduct(id, name, stock, price) {
  let newProduct = {};
  newProduct.id = id;
  newProduct.name = name;
  newProduct.stock = stock;
  newProduct.price = price;

  newProduct.setPrice = function(newPrice) {
    if (newPrice >= 0) {
      this.price = newPrice;
    } else {
      alert('Invalid price!');
    }
  };

  newProduct.describe = function() {
    console.log('Name: ' + this.name);
    console.log('ID: ' + this.id);
    console.log('Price: $' + this.price);
    console.log('Stock: ' + this.stock);
  };

  return newProduct;
}

let scissors = createProduct(0, 'Scissors', 10, 5);
let cordlessDrill = createProduct(1, 'Cordless Drill', 10, 25);
let hammer = createProduct(2, 'Hammer', 10, 7);
let level = createProduct(3, 'Level', 10, 6);