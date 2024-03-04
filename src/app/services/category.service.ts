import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private nextId = 0;

  constructor(private localStorageService: LocalStorageService) {
    this.initializeCategories();
  }

  private initializeCategories(): void {
    const storedCategories = this.localStorageService.getCategories();
    if (storedCategories && storedCategories.length > 0) {
      this.nextId = Math.max(...storedCategories.map(c => c.id)) + 1;
    }
  }

  public getNextId(): number {
    return this.nextId;
  }

  list(): Category[] {
    return this.localStorageService.getCategories();
  }

  get(id: number): Category {
    const category = this.list().find(category => category.id === id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found.`);
    }
    return category;
  }

  delete(id: number): void {
    if (!this.list().some(category => category.id === id)) {
      throw new Error(`Category with ID ${id} not found.`);
    }
    let categories = this.list().filter(category => category.id !== id);
    this.localStorageService.saveCategories(categories);
  }

  add(newCategoryData: Category): void {
    const categories = this.list();
    newCategoryData.id = this.nextId++;
    categories.push(newCategoryData);
    this.localStorageService.saveCategories(categories);
  }

  update(category: Category): void {
    let categories = this.list();
    const index = categories.findIndex(c => c.id === category.id);
    if (index === -1) {
      throw new Error(`Category with ID ${category.id} not found.`);
    }
    categories[index] = category;
    this.localStorageService.saveCategories(categories);
  }

  updateOrAdd(category: Category): void {
    let categories = this.list();
    const index = categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      categories[index] = category;
    } else {
      category.id = this.nextId++;
      categories.push(category);
    }
    this.localStorageService.saveCategories(categories);
  }
}
