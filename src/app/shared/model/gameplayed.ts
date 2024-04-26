export class GamePlayed {
  chosenCategoryID: number;
  gamePlayedID: number;
  datePlayed = new Date();
  amountOfPoints: number;

  constructor(
    chosenCategoryID: number,
    gamePlayedID: number,
    datePlayed: Date,
    amountOfPoints: number
  ) {
    this.chosenCategoryID = chosenCategoryID;
    this.gamePlayedID = gamePlayedID;
    this.amountOfPoints = amountOfPoints;
    this.datePlayed = datePlayed;
  }
}
