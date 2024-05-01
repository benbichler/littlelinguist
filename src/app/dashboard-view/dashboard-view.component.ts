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

  constructor(private gamePointsService: GamePointsService) {}

  ngOnInit(): void {
    this.gamesPlayedOverall = this.gamePointsService.list();
    this.calculateTotalPoints();
    this.calculateMostPlayedCategory();
    this.calculatePerfectGamesPercentage();
  }

  calculateTotalPoints(): void {
    const pointsInGames = this.gamePointsService.list();
    for (const pointInOneGame of pointsInGames) {
      this.TotalPointsInAllGames += pointInOneGame.amountOfPoints;
    }
  }

  calculateMostPlayedCategory(): void {}

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
