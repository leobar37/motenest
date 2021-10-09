import { UsersModule } from '../users.module';
import { map, tap, concatMap } from 'rxjs/operators';
import { IContact } from '../model/index';
import { of, throwError, Observable } from 'rxjs';
import { Injectable, Inject, InjectionToken } from '@angular/core';

export const storageFactory = function () {
  const res = !!window && !!localStorage;
  console.log('res', res);

  return res ? localStorage : null;
};

export const LOCAL_STORAGE_TOKEN = new InjectionToken('local-storage-token', {
  factory: storageFactory,
});

@Injectable()
export class ConctactService {
  constructor(@Inject(LOCAL_STORAGE_TOKEN) private storage: Storage) {}

  private collectionKey = 'contacts-collection';

  public supported() {
    return this.storage != null
      ? of(true)
      : throwError('Local storage not supported');
  }

  public getCollection(): Observable<IContact[]> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.collectionKey)),
      map((value: string | null) => (value ? JSON.parse(value) : []))
    );
  }

  public addCollection(records: IContact[]) {
    return this.getCollection().pipe(
      map((contacts) => [...contacts, ...records]),
      tap((contacts) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(contacts))
      )
    );
  }
  // remove from collection
  public removeFromCollection(ids: Array<string>): Observable<IContact[]> {
    return this.getCollection().pipe(
      map((contacts) =>
        contacts.filter((contact) => !ids.includes(contact.id))
      ),
      tap((contacts) =>
        this.storage.setItem(this.collectionKey, JSON.stringify(contacts))
      )
    );
  }

  // edit on collection
  public editOnCollection(
    id: string,
    contact: IContact
  ): Observable<IContact[]> {
    return this.removeFromCollection([id]).pipe(
      concatMap((_) => {
        return this.addCollection([contact]).pipe(
          concatMap(() => {
            return this.getCollection();
          })
        );
      })
    );
  }

  // clean collecction
  public cleanCollection() {
    return this.supported().pipe(
      tap((_) => this.storage.removeItem(this.collectionKey))
    );
  }
}
