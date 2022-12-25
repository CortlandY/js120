function Dog(name, breed, weight) {
  // Object.setPrototypeOf(this, Dog.myPrototype);
  // deleted b/c we can use the built in JS function prototype inheritance
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

// this is the prototype object that we add methods to for all of the Dog
// objects that are created
Dog.prototype.bark = function() {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};


let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark();
biggie.bark();
dexter.bark();

console.log(Dog.prototype.constructor);

if (maxi.constructor === Dog) {
  console.log('It\'s a dog');
} else {
  console.log('It\'s not a dog');
}


// can also override the prototype
dexter.bark = function() {
  console.log('WOOF!');
};

maxi.bark();
dexter.bark();