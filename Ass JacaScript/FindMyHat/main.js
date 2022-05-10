// import all required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
// instantiate variable


const hat = '^'; // My hat
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*'; 
const row = 10;
const col = 10;



// Create a Classs

class Field {
  constructor(field) {
    this.field = field;
    this.locationX = 0; 
    this.locationY = 0; 

    this.gameStart = true; 
  }

static generateField(row, col, percentage) { // no need to create a new object by utilising static
  let newField = []; 
  let holeNumber = row * col * percentage;  // the holes are lesser than the fields generated
  
  //create field filled with fieldCharacters
  for (let i = 0; i < row; i++) {
    newField.push([]); {for (let j = 0; j < col; j++) {
    newField[i].push(fieldCharacter);
    }
  }
  }; 

  // '*' position
  newField[0][0] = pathCharacter;   // the initial posisiton is always in the array[0][0]
  let hatX = Math.floor(Math.random() * row);
  let hatY = Math.floor(Math.random() * col);
  newField[hatY][hatX] = hat; 

//holes position
  for (let i = 0; i < holeNumber; i++) {
    let holeX = Math.floor(Math.random() * row); 
    let holeY = Math.floor(Math.random() * col); 
    newField[holeX][holeY] = hole; 

// avoid the posotions below
  while (holeX === 0 && holeY === 0 || hatX === holeX && hatY === holeY){
    let holeX = Math.floor(Math.random() * row); 
    let holeY = Math.floor(Math.random() * col); 
    newField[holeX][holeY] = hole; 
    }
  }

  return newField; 
}; 

//method to print the field with a * at the current location
  print() {
    this.field[this.locationY][this.locationX] = pathCharacter; 
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join('')); 
    } 
  };

//method to check the game status
  winCheck() {
    if (this.field[this.locationY][this.locationX]=== hat) {
      this.gameStart = false;
      console.log('Congrats, you found your hat!') 
    } else if (this.field[this.locationY][this.locationX]=== hole) {
      this.gameStart = false; 
      console.log('Sorry, you fell down a hole!')
    } else if (this.locationY < 0 || this.locationX < 0) {
      this.gameStart = false; 
      console.log('Out of bounds - Game End!');  
    } 
  }

//The controls of input by users
  location(){
    let mov = prompt('Which way ?') 
    if (mov==='r'){
      this.locationX+=1;  
    } else if (mov==='l'){
      this.locationX-=1; 
    } else if (mov==='u'){
      this.locationY-=1; 
    } else if (mov==='d'){
      this.locationY+=1; 
    }
  }


//do while loop to print the field, ask user input+update location
  runGame(){
    do {
      this.print(); 
      this.location(); 
      this.winCheck(); 
    } while (this.gameStart === true);
  } 
};  

const testField = new Field(Field.generateField(10,10,0.3));

testField.runGame(); 