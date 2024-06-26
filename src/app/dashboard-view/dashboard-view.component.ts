import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GamePlayed } from '../shared/model/gameplayed';
import { GamePointsService } from '../services/game-points.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css',
})
export class DashboardViewComponent implements OnInit {
  TotalPointsInAllGames: number = 0;
  gamesPlayedOverall: GamePlayed[] = [];
  mostPlayedCategory: string = '';
  perfectGamesPercentage: number = 0;
  totalPlayedTime: number = 0;
  averageGameTime: number = 0;
  gamesEndedEarlyCount: number = 0;
  gamesFinishedOnTimePercent: number = 0;

  constructor(private gamePointsService: GamePointsService) {}

  ngOnInit(): void {
    this.gamesPlayedOverall = this.gamePointsService.list();
    this.calculateTotalPoints();
    this.calculateMostPlayedCategory();
    this.calculatePerfectGamesPercentage();
    this.totalTimePlayed();
    this.averagePlayTimePerGame();
    this.calculateGamesFinishedEarlyPercent();

    console.log(this.mostPlayedCategory);
  }
  calculateGamesFinishedEarlyPercent(): void {
    this.gamesEndedEarlyCount = 0;
    const games = this.gamePointsService.list();
    for (const game of games) {
      if (game.secondsLeftInGame > 0) {
        this.gamesEndedEarlyCount++;
        this.gamesFinishedOnTimePercent =
          this.gamesEndedEarlyCount / games.length;
      }
    }
  }
  averagePlayTimePerGame(): void {
    this.averageGameTime = 0;
    const games = this.gamePointsService.list();
    for (const game of games) {
      const timePlayed = game.secondsPlayed - game.secondsLeftInGame;
      this.averageGameTime = timePlayed / games.length;
    }
    console.log('Average playtime per game:', this.averageGameTime);
  }

  totalTimePlayed(): void {
    this.totalPlayedTime = 0;
    const games = this.gamePointsService.list();
    console.log('Games:', games); // Check if games array is not empty
    for (const game of games) {
      const timePlayed = game.secondsPlayed - game.secondsLeftInGame;
      this.totalPlayedTime += timePlayed;
    }
    console.log('Total played time:', this.totalPlayedTime); // Check the total played time
  }

  calculateTotalPoints(): void {
    const pointsInGames = this.gamePointsService.list();
    for (const pointInOneGame of pointsInGames) {
      this.TotalPointsInAllGames += pointInOneGame.amountOfPoints;
    }
  }

  calculateMostPlayedCategory(): void {
    let maxCount = 0;
    let mostPlayedCategory: string | undefined;

    for (let i = 0; i < this.gamesPlayedOverall.length; i++) {
      const category = this.gamesPlayedOverall[i].chosenCategoryID;
      let count = 0;

      for (let j = 0; j < this.gamesPlayedOverall.length; j++) {
        if (this.gamesPlayedOverall[j].chosenCategoryID === category) {
          count++;
        }
      }

      // Update maxCount and mostPlayedCategory if current count is higher
      if (count > maxCount) {
        maxCount = count;
        mostPlayedCategory = category;
      }
    }

    this.mostPlayedCategory = mostPlayedCategory || '';
  }

  calculatePerfectGamesPercentage(): void {
    let perfectGamesCount = 0;
    this.gamesPlayedOverall.forEach((game) => {
      if (game.amountOfPoints === 100) {
        perfectGamesCount++;
      }
    });
    this.perfectGamesPercentage =
      perfectGamesCount / this.gamesPlayedOverall.length;
  }
}
