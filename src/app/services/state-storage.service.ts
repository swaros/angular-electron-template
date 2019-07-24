import { KeyValue } from './../model/KeyValue';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {

  private storage: KeyValue[] = [];

  private configAnnounced = new Subject<KeyValue>();
  configChanged$ = this.configAnnounced.asObservable();

  constructor() { }

  public set(entry: KeyValue): number {
    let state = 2;
    const found = this.storage.filter((stored: KeyValue) => stored.key === entry.key);
    if (found !== null && found.length > 1) {
      console.error(entry.key, ' have found multiple entries. all of them will removed first', found);
      this.removeKey(entry.key);
      state = 3;
    }
    if (found !== null && found.length === 1) {
      found[0].value = entry.value;
      this.configAnnounced.next(found[0]);
      return 1;
    }
    this.storage.push(entry);
    this.configAnnounced.next(entry);
    console.log('new content of storage', this.storage);
    return state;
  }

  public removeKey(key: string ): void {
    const tmpStorage: KeyValue[] = [];
    for (const tmpEnt of this.storage) {
      if (tmpEnt.key !== key) {
        tmpStorage.push(tmpEnt);
      }
    }
    this.storage = tmpStorage;
  }


  public get(key: string): any {
    const found = this.storage.filter((stored: KeyValue) => stored.key === key);
    if (found !== null && found.length === 1) {
      return found[0].value;
    }
    return null;
  }

}
