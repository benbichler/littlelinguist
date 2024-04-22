import { Injectable } from '@angular/core';
import { GameProfile } from '../shared/model/gameprofile';
import { GameDifficulty } from '../shared/model/gamedifficulty';

@Injectable({
  providedIn: 'root',
})
export class GameInformationService {
  private allGames: GameProfile[] = [
    new GameProfile(
      1,
      'Matching Game',
      "Match the word and it's correct translation",
      GameDifficulty.EASY,
      'matchingame'
    ),
    new GameProfile(
      2,
      'Scrambled Words Game',
      'Unscramble the words to find the correct answer',
      GameDifficulty.MEDIUM,
      'scrambledgame'
    ),
    new GameProfile(
      3,
      'Word Sorter Game',
      'Sort the words shown and decide which category they belong to',
      GameDifficulty.HARD,
      'wordsortergame'
    ),
  ];

  list(): GameProfile[] {
    return this.allGames;
  }

  constructor() {}
}
