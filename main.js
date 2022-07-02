// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//console.log(`Random base: ${returnRandBase()}`);
//console.log(`Mock up strand: ${mockUpStrand()}`);

// Factory for Pila Aequors 
const pAequorFactory = (number, strand) => {
  return {
    specimenNum: number,
    dna: strand,
    mutate(){
      let randIndex = Math.floor(Math.random() * this.dna.length); // generation of index to mutate 
      let newBase = returnRandBase();
      while (this.dna[randIndex] == newBase){ // loop while newBase is equal to current base
        newBase = returnRandBase();
      }
    //console.log(`Current base: ${this.dna[randIndex]}`); 
    //console.log(`Mutated base: ${newBase}`); 
    //console.log(`Changed ${this.dna[randIndex]} to ${newBase} at index ${randIndex}`);
    this.dna[randIndex] = newBase; // mutate current base to new (after loop so newBase isn't equal to old base)
    },
    compareDNA(compareObject){
      let counter = 0;
      let dnaLength = this.dna.length;
      for (let i = 0; i < dnaLength; i++) { 
        if (this.dna[i] === compareObject.dna[i]){
          counter++; 
        }
      }
      //console.log("this is the counter: " + counter)
      console.log(`Specimen #${this.specimenNum} and speciment #${compareObject.specimenNum} have ${(counter/dnaLength * 100).toFixed(2)}% DNA in common.`)
    },
    willLikelySurvive(){
      let countCG = this.dna.filter(letter => letter === "C" || letter === "G"); //counter of 'C' and 'G' bases in DNA
      return countCG.length/this.dna.length > 0.6;
    }
  }
};

const sample = []; //Array to store 30 instances of pAequor that can survive in their natural environment 
let num = 1; // starting specimen numbers

while (sample.length < 30) { // we need 30 samples
  let aequor = pAequorFactory(num,mockUpStrand());
  if (aequor.willLikelySurvive() === true) { // 30 samples of survivors 
  sample.push(aequor);
  num++;
  }
}
//console.log(sample);

//Examplar for Tests 
const pAequor1 = pAequorFactory(1, mockUpStrand());
const pAequor2 = pAequorFactory(2, mockUpStrand());

//1. Test for .mutate() method
//console.log (pAequor1.dna);
console.log("Test for .mutate() method")
console.log(`Starting DNA: ${pAequor1.dna}`);
pAequor1.mutate();
console.log(`Mutated DNA: ${pAequor1.dna}`);

//2. Test for .compareDNA() method
console.log("Test for .compareDNA() method")
console.log(`DNA of speciment #${pAequor1.specimenNum}: [${pAequor1.dna}]`);
console.log(`DNA of speciment #${pAequor2.specimenNum}: [${pAequor2.dna}]`);
pAequor1.compareDNA(pAequor2);
//console.log(pAequor1.compareDNA(pAequor2)); 

//3. Test for .willLikelySurvive() method
console.log(`P.aequor specimen #${pAequor1.specimenNum} will survive: ${pAequor1.willLikelySurvive()}`);





