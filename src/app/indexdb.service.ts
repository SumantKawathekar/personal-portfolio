import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from "idb";

@Injectable({
  providedIn: 'root'
})
export class IndexdbService {
  public db: IDBPDatabase<mydb>;
  userData: any;
  constructor() { 
     this.connectDB()
  }
  async connectDB() {
    this.db = await openDB<mydb>('portfolio-db', 1, {
      upgrade(db) {
        db.createObjectStore('user-store')
      }
    })
  }
  public addUser(user) {
    const userObj = JSON.stringify(user)
    return this.db.put('user-store', userObj,'userKey')
  }

  public getUser() {
    return this.db.get('user-store', 'userKey')
  }
  public updateUser(user) {
    const userObj = JSON.stringify(user)
    return this.db.put('user-store', userObj,'userKey')
  }

  public removeUser(){
    return this.db.delete('user-store', 'userKey')
  }

}



interface mydb extends DBSchema {
  'user-store':  {
    key: string,
    value:string
  }
}

