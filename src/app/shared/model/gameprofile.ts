import { GameDifficulty } from "./gamedifficulty";

export class GameProfile {
    gameID: number;
    gameName: string;
    gameDesc: string;
    difficultyLev: GameDifficulty;
    url: string;


constructor(gameID: number,
        gameName: string,
        gameDesc: string,
        difficultyLev: GameDifficulty, url: string) {
        this.gameID = gameID;
        this.gameName = gameName;
        this.gameDesc = gameDesc;
        this.difficultyLev = difficultyLev;
        this.url = url;
    }

}

