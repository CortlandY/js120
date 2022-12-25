/* eslint-disable max-len */
/*
//  Factory Function Version
let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


function createPet(animal, name) {
  return {
    animal: animal,
    name: name,
    sleep: function() {
      console.log('I am sleeping');
    },
    wake: function() {
      console.log('I am awake');
    },
  };
}
*/

// OLOO Version
const PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep: function() {
    console.log('I am sleeping');
  },
  wake: function() {
    console.log('I am awake');
  },
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


/* how do the objects in these versions differ from each other?

The OLOO objects have a prototype object that contains the methods associated with thte created objects.
All pets share the same methods, which are stored in the PetPrototype.
In the Factory Function verison, each pet object has a copy of the methods.
Here, OLOO is more efficient in terms of memory use.

Objects created with the factory function can have private state.
Any state stored in the body of the factory function instead of in the returned object is private to the returned object.
They can't be accessed or modified unless one of the object methods exposes the state.
With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.
*/