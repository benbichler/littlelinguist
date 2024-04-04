import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GamePlayed } from '../shared/model/gameplayed';
import { GamePointsService } from '../services/game-points.service';
@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [MatCardModule,],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent implements OnInit {

  TotalPointsInAllGames: number = 0;
  gamesPlayedOverall: GamePlayed[] = [];

  constructor (private gamePointsService: GamePointsService){}

  ngOnInit(): void {
    this.gamesPlayedOverall = this.gamePointsService.list();
    this.calculateTotalPoints();

}

calculateTotalPoints() : void{
  const pointsInGames = this.gamePointsService.list();
  for (const pointInOneGame of pointsInGames){
    this.TotalPointsInAllGames += pointInOneGame.amountOfPoints;


    }
  }
}
