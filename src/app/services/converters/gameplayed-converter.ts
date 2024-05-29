import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { GamePlayed } from '../../shared/model/gameplayed';

export const gamePlayedConverter = {
  toFirestore: (gamePlayed: GamePlayed) => {
    return {
      chosenCategoryID: gamePlayed.chosenCategoryID,
      gamePlayedID: gamePlayed.gamePlayedID,
      datePlayed: Timestamp.fromDate(gamePlayed.datePlayed),
      amountOfPoints: gamePlayed.amountOfPoints,
      secondsPlayed: gamePlayed.secondsPlayed,
      secondsLeftInGame: gamePlayed.secondsLeftInGame,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const gamePlayed = new GamePlayed(
      snapshot.id,
      data['gamePlayedID'],
      data['datePlayed'].toDate(),
      data['amountOfPoints'],
      data['secondsPlayed'],
      data['secondsLeftInGame']
    );

    return gamePlayed;
  },
};
