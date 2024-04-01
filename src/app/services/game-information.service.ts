import { Injectable } from '@angular/core';
import { GameProfile } from '../shared/model/gameprofile';
import { GameDifficulty } from '../shared/model/gamedifficulty';

@Injectable({
  providedIn: 'root'
})
export class GameInformationService {

 
  private allGames : GameProfile[] = [
    new GameProfile(1,"Matching Game","Match the word and it's correct translation", GameDifficulty.EASY, "www.littlelinguist.ono/matchingame"),
    new GameProfile(2, "Scrambled Words Game", "Unscramble the words to find the correct answer", GameDifficulty.MEDIUM, "www.littlelinguist.ono/scrambledwords"),
  ]


  list () : GameProfile [] {
    return this.allGames;
  }

  constructor() {}

}



