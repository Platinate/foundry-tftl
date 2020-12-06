export class RollData {
  constructor() {
    this.isExhausted = false;
    this.isUpset = false;
    this.isScared = false;
    this.isInjured = false;
    this.isBroken = false;
    this.nbDice = 0;
    this.rollMode = DICE_ROLL_MODES.PUBLIC;
  }

  getRollFormula() {
    let nbDice = this.nbDice;
    if(this.isExhausted)
        nbDice--;
    if(this.isUpset)
        nbDice--;
    if(this.isScared)
        nbDice--;
    if(this.isInjured)
        nbDice--;
    if(this.isBroken)
        nbDice = 0;
    return `${nbDice}d6cs=6`
  }

  getRoll() {
    const rollFormula = this.getRollFormula();
    const roll = new Roll(rollFormula);

    //Pin our rollData object to the roll to tell it was handled by this system
    roll.tftl = this;

    return roll;
  }
}
