import { KeyValue } from './../model/KeyValue';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {

  private storage: KeyValue[] = [];

  constructor() { }

  public set(entry: KeyValue): number {
    const found = this.storage.filter((stored: KeyValue) => stored.key === entry.key);
    if (found !== null && found.length === 1) {
      found[0].value = entry.value;
      return 1;
    }
    this.storage.push(entry);
    return 2;
  }

  public get(key: string): any{
    const found = this.storage.filter((stored: KeyValue) => stored.key === key);
    if (found !== null && found.length === 1) {
      return found[0].value;
    }
    return null;
  }

}
