import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestoreService: Firestore) {}

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'categories'
    ).withConverter(categoryConverter);

    const querySnapShot: QuerySnapshot<Category> = await getDocs(
      collectionConnection
    );

    const results: Category[] = [];

    querySnapShot.docs.forEach(
      (docSnap: DocumentSnapshot<Category | undefined>) => {
        let data = docSnap.data();
        if (data) {
          results.push(data);
        }
      }
    );
    return results;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestoreService,
      'categories',
      id
    ).withConverter(categoryConverter);
    return (await getDoc(categoryDocRef)).data();
  }

  async add(newCategoryData: Category) {
    await addDoc(
      collection(this.firestoreService, 'categories').withConverter(
        categoryConverter
      ),
      newCategoryData
    );
  }

  async delete(existingCategoryId: string) {
    const personDocRef = doc(
      this.firestoreService,
      'categories',
      existingCategoryId
    ).withConverter(categoryConverter);
    return deleteDoc(personDocRef);
  }

  async update(existingCategory: Category): Promise<void> {
    existingCategory.lastModifiedDate = new Date();

    const categoryDocRef = doc(
      this.firestoreService,
      'categories',
      existingCategory.id
    ).withConverter(categoryConverter);
    return await setDoc(categoryDocRef, existingCategory);
  }
}
