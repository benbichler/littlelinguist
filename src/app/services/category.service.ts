import { Injectable } from '@angular/core';
import { Category } from '../shared/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly NEXT_ID_KEY = 'nextId';
  private readonly CATEGORIES_KEY = 'categories';
  private idStringKey = 'currentCategoryId';
  
  private setCategories(allCategories: Map<number, Category>) : void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(allCategories.values())));
  }

  private getCategories() : Map<number, Category>{
    let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
    let idToCategory = new Map<number, Category>();

    if(categoriesString) {
      JSON.parse(categoriesString).forEach((category: Category) => {
        Object.setPrototypeOf(category, Category.prototype);
        idToCategory.set(category.id, category);
      });
    }
    return idToCategory;
  }

  private getNextId(): number {
  let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
  return nextIdString ? parseInt(nextIdString) : 0; 
  }

  private setNextId(id: number) : void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  list(): Category[] {
    return Array.from(this.getCategories().values());
  }

  get(id: number): Category {
   let categoriesMap = this.getCategories().get(id)!;
   if(!categoriesMap){
    throw new Error(`Category number ${id} doesn't exist and can not be retrieved.`)
   }
   return categoriesMap;
  }

  delete(id: number): void {
   let categoriesMap = this.getCategories();
   if(!categoriesMap.has(id)) {
    throw new Error(`Category number ${id} doesn't exist and can not be deleted.`);
   }
   categoriesMap.delete(id);
   this.setCategories(categoriesMap);
  }

  add(category: Category) {
    category.id = this.getNextId();
    category.lastModifiedDate = new Date();

    let categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);
    
    this.setCategories(categoriesMap);
    this.setNextId(++category.id);
  }

  update(category: Category) {
    let categoriesMap = this.getCategories();
    if(!categoriesMap.has(category.id)){
      throw new Error(`Category number ${category.id} doesn't exist and can not be updated.`)
    }
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
  }

  setCurrentCategoryId(idString: string): void{
    console.log(`Setting current category ID: ${idString}`);
    localStorage.setItem(this.idStringKey, idString);
  }

  getCurrentCategoryId(): string | null {
    let id = localStorage.getItem(this.idStringKey);
    console.log(`Getting current category ID: ${id}`);
    return id;
  }
}

