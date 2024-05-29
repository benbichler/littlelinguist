export class GamePlayed {
  chosenCategoryID: string;
  gamePlayedID: string;
  datePlayed = new Date();
  amountOfPoints: number;
  secondsPlayed: number;
  secondsLeftInGame: number;
  constructor(
    chosenCategoryID: string,
    gamePlayedID: string,
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
