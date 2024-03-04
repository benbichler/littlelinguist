import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private idStringKey = 'currentCategoryId';
  private categoriesKey = 'categories';

  setCurrentCategoryId(idString: string): void {
    localStorage.setItem(this.idStringKey, idString);
  }

  getCurrentCategoryId(): string | null {
    return localStorage.getItem(this.idStringKey);
  }

  clearCurrentCategoryId(): void {
    localStorage.removeItem(this.idStringKey);
  }

  getCategories(): Category[] {
    const categoriesString = localStorage.getItem(this.categoriesKey);
    return categoriesString ? JSON.parse(categoriesString) : [];
  }

  saveCategories(categories: Category[]): void {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
  }

  addCategory(category: Category): void {
    const categories = this.getCategories();
    // Assuming category.id is managed outside and is unique
    categories.push(category);
    this.saveCategories(categories);
  }

  deleteCategory(id: number): void {
    let categories = this.getCategories();
    categories = categories.filter(category => category.id !== id);
    this.saveCategories(categories);
  }

  updateCategory(updatedCategory: Category): void {
    let categories = this.getCategories();
    const index = categories.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = updatedCategory;
      this.saveCategories(categories);
    }
  }

  getCategoryById(id: number): Category | undefined {
    const categories = this.getCategories();
    return categories.find(category => category.id === id);
  }
}
