import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';
import { Category } from '../../shared/model/category';
import { TranslatedWord } from '../../shared/model/translateword';

export const categoryConverter = {
  toFirestore: (category: Category) => {
    const words = [];

    for (let i = 0; i < category.words.length; i++) {
      words.push({
        origin: category.words[i].origin,
        target: category.words[i].target,
      });
    }
    return {
      name: category.name,
      words: words,
      lastModifiedDate: Timestamp.fromDate(category.lastModifiedDate),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const words = data['words'];
    const category = new Category(
      snapshot.id,
      data['name'],
      data['lastModifiedDate'].toDate()
    );

    if (words) {
      for (let i = 0; i < words.length; i++) {
        category.words.push(
          new TranslatedWord(words[i].origin, words[i].target)
        );
      }
    }

    return category;
  },
};
