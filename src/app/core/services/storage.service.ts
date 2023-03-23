import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public setData(key: string, value: any): void {
    const strigifiedData = JSON.stringify(value);
    localStorage.setItem(key, strigifiedData);
  }

  public getData(key: string): any {
    const rawData = localStorage.getItem(key);

    if (!rawData) return;

    const data = JSON.parse(rawData);
    return data;
  }

  public deleteData(key: string): void {
    localStorage.removeItem(key);
  }
}
