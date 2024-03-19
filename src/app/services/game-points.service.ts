import { Injectable } from '@angular/core';
import { GamePlayed } from '../shared/model/gameplayed';

@Injectable({
  providedIn: 'root'
})
export class GamePointsService {
  
  private readonly GAME_PLAYED_KEY = 'gamePlayed';
  gamePointsList: GamePlayed[] = [];

  constructor() { 
    const storedData = localStorage.getItem(this.GAME_PLAYED_KEY);
    if (storedData) {
      this.gamePointsList = JSON.parse(storedData);
    }
  }

  list(): GamePlayed[] {
    return this.gamePointsList;
  }

  addGamePlayed(gamePlayed: GamePlayed) { 
    this.gamePointsList.push(gamePlayed);
    localStorage.setItem(this.GAME_PLAYED_KEY, JSON.stringify(this.gamePointsList));
  }  
}
