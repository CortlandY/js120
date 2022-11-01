// let book1 = {
//   title: 'Mythos',
//   author: 'Stephen Fry',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}`);
//   }
// };

// let book2 = {
//   title: 'Me Talk Pretty One Day',
//   author: 'David Sedaris',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}`);
//   }
// };

// let book3 = {
//   title: 'Aunts aren\'t Gentlemen',
//   author: 'PG Wodehouse',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}`);
//   }
// };

function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read,

    getDescription() {
      console.log(`${this.title} was written by ${this.author}. I ${this.read ? `have` : `haven't`} read it.`);
    },
    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book3.getDescription();
book2.readBook();
book2.getDescription();
book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.