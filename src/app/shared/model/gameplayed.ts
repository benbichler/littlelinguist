export class GamePlayed {
  chosenCategoryID: number;
  gamePlayedID: number;
  datePlayed = new Date();
  amountOfPoints: number;
  secondsPlayed: number;
  secondsLeftInGame: number;

  constructor(
    chosenCategoryID: number,
    gamePlayedID: number,
    datePlayed: Date,
    amountOfPoints: number,
    secondsPlayed: number,
    secondsLeftInGame: number
  ) {
    this.chosenCategoryID = chosenCategoryID;
    this.gamePlayedID = gamePlayedID;
    this.amountOfPoints = amountOfPoints;
    this.datePlayed = datePlayed;
    this.secondsPlayed = secondsPlayed;
    this.secondsLeftInGame = secondsLeftInGame;
  }
}
