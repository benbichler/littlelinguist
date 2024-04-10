export class GamePlayed {
  chosenCategoryID: number;
  gamePlayedID: number;
  date = new Date();
  amountOfPoints: number;

  constructor(
    chosenCategoryID: number,
    gamePlayedID: number,
    amountOfPoints: number,
  ) {
    this.chosenCategoryID = chosenCategoryID;
    this.gamePlayedID = gamePlayedID;
    this.amountOfPoints = amountOfPoints;
  }
}
