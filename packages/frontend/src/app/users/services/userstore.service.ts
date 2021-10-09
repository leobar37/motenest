import { ModeReuForm } from '../model/index';
import {
  switchMap,
  tap,
  concatMap,
  mergeMap,
  withLatestFrom,
  exhaustMap,
} from 'rxjs/operators';
import { ConctactService } from './userstorage.service';
import { Injectable, OnInit } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { IContact } from '../model';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

export interface ContactState {
  selectId: string | null;
  contacts: IContact[];
  callState: CallState;
}

import { Observable, EMPTY, pipe } from 'rxjs';

export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

type CallState = LoadingState | ErrorState;

const defaultState: ContactState = {
  contacts: [],
  selectId: null,
  callState: LoadingState.INIT,
};

const getError = (callState: CallState) => {
  if (typeof (callState as ErrorState).errorMsg != 'undefined') {
    return (callState as ErrorState).errorMsg;
  }
  return null;
};

@Injectable()
export class ContactStore extends ComponentStore<ContactState> {
  loadContacts = this.effect(($trigger) => {
    return $trigger.pipe(
      switchMap((_) => {
        this.updateLoadong(LoadingState.LOADING);
        return this.contactService.getCollection().pipe(
          tapResponse(
            (contacts) => {
              console.log('receive contacts', contacts);
              this.addContacts(contacts);
              this.updateLoadong(LoadingState.LOADED);
            },
            () => this.updateError('No se pudo cargar los contactos')
          )
        );
      })
    );
  });

  // add Contacts

  addContact = this.effect((contact: Observable<IContact>) => {
    return contact.pipe(
      concatMap((contact) => {
        return this.contactService.addCollection([contact]).pipe(
          tapResponse(
            () => {
              this.setContact(contact);
            },
            (err) => {
              this.updateError('No se puede agregar el contacto');
            }
          )
        );
      })
    );
  });
  readonly selectId$ = this.select((state) => state.selectId);

  editContact = this.effect((contact: Observable<{ contact: IContact }>) => {
    return contact.pipe(
      withLatestFrom(this.selectId$),
      concatMap(([{ contact }, id]) => {
        if (!id) {
          this.updateError('No se ha seleccionado un id');
          return EMPTY;
        }
        contact = { ...contact, id: id };
        return this.contactService.editOnCollection(id, contact).pipe(
          tapResponse(
            (contacts) => {
              this.patchState({ contacts });
            },
            () => {
              this.updateError('No se pudo editar el contacto');
            }
          )
        );
      })
    );
  });
  // delte comment
  deleteComment = this.effect((trigger$) => {
    return trigger$.pipe(
      pipe(
        withLatestFrom(this.selectId$),
        exhaustMap(([, id]) => {
          return this.contactService.removeFromCollection([id]).pipe(
            tapResponse(
              (contacts) => {
                this.loadContacts();
                this.patchState({
                  selectId: null,
                });
              },
              () => {
                this.updateError(
                  'Hemos tenido problemas al eliminar el contacto'
                );
              }
            )
          );
        })
      )
    );
  });

  constructor(private contactService: ConctactService) {
    super(defaultState);
  }
  ngOnInit(): void {}

  /*=============================================
  =            selectors            =
  =============================================*/

  readonly contacts$ = this.select((state) => state.contacts);
  readonly error$ = this.select((state) => getError(state.callState));
  readonly loading$ = this.select(
    (state) => state.callState == LoadingState.LOADING
  );

  readonly selectModeForm = this.select(this.selectId$, (id) => {
    return !!id ? ModeReuForm.EDIT : ModeReuForm.CREATE;
  });

  readonly contact$ = this.select(
    this.selectId$,
    this.contacts$,
    (currentid, contacts) => {
      if (!currentid) {
        return null;
      }
      return contacts.find(({ id }) => id == currentid);
    }
  );

  /*=============================================
  =            updates            =
  =============================================*/

  // addcontact
  readonly setContact = this.updater((state, contact: IContact) => {
    return {
      ...state,
      selectId: contact.id,
      contacts: [...state.contacts, contact],
    };
  });

  readonly addContacts = this.updater((state, contacts: IContact[]) => {
    return {
      ...state,
      contacts: contacts,
    };
  });

  // update error
  readonly updateError = this.updater((state, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error,
      },
    };
  });
  // update loading
  readonly updateLoadong = this.updater((state, loading: LoadingState) => {
    return {
      ...state,
      callState: loading,
    };
  });

  //retrive contact

  // removeContact

  // update Contact

  /*=============================================
    =            selectors            =
    =============================================*/

  readonly selectContact = this.select(
    this.selectId$,
    this.contacts$,
    (id, contacts) => {
      return contacts.find(({ id: lid }) => lid === id);
    }
  );
}
