import { filter } from 'rxjs/operators';
import { IContact } from './model/index';
import { Component, OnInit } from '@angular/core';
import { ContactStore } from './services/userstore.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ContactStore],
})
export class UsersComponent implements OnInit {
  constructor(
    private contactStore: ContactStore,
    private message: NzMessageService
  ) {}

  contacts$ = this.contactStore.contacts$;
  contact$ = this.contactStore.contact$;
  ngOnInit(): void {
    //contacts
    this.contactStore.loadContacts();

    this.contactStore.error$.pipe(filter(Boolean)).subscribe((msg: string) => {
      this.message.error(msg);
    });
  }
  onContact(contact: IContact) {
    this.contactStore.addContact(contact);
  }
  editContact(contact: IContact) {
    this.contactStore.editContact({ contact });
  }
  deleteComment() {
    this.contactStore.deleteComment();
  }

  onSelectItem(id: string) {
    // this.contactStore
    this.contactStore.patchState({
      selectId: id,
    });
  }
}
