function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
};

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);  // true
console.log(ninjaB.swing().swung);  // true