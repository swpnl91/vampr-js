class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
      if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
        return false;
      } else {
        return true;
      }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    let currentVampire = this;
    let vampireToCompare = vampire;

    if (currentVampire === vampireToCompare) {
      return currentVampire;
    }

    if (currentVampire.creator === vampireToCompare) {
      return vampireToCompare;
    } else if (vampireToCompare.creator === currentVampire) {
      return currentVampire;
    }

    if (currentVampire.creator === null) {
      return currentVampire;
    } else if (vampireToCompare.creator === null) {
      return vampireToCompare;
    }

    if (currentVampire.numberOfVampiresFromOriginal > vampireToCompare.numberOfVampiresFromOriginal) {
      while (currentVampire.numberOfVampiresFromOriginal !== vampireToCompare.numberOfVampiresFromOriginal) {
        currentVampire = currentVampire.creator;
      }   
    } else {
      while (currentVampire.numberOfVampiresFromOriginal !== vampireToCompare.numberOfVampiresFromOriginal) {
        vampireToCompare = vampireToCompare.creator;
      } 
    }

    // climb "up" the tree (using iteration), counting nodes, until common boss is found
    while (currentVampire.creator !== vampireToCompare.creator) {
      
      if (currentVampire.creator !== null) {
        currentVampire = currentVampire.creator;
      } else {
        currentVampire = currentVampire;
      }

      if (vampireToCompare.creator !== null) {
        vampireToCompare = vampireToCompare.creator;
      } else {
        vampireToCompare = vampireToCompare;
      }

    }
    return currentVampire.creator;
  }
}

module.exports = Vampire;

