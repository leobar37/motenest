import { IContact } from '../model/index';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';
import {
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-contacts',
  template: `
    <h1 class="w-100 text-center">list contacts</h1>
    <mat-selection-list
      (selectionChange)="onChangue($event)"
      #list
      class="w-100"
      [multiple]="false"
    >
      <mat-list-option *ngFor="let contact of contacts" [value]="contact.id">
        <div nz-row class="w-100">
          <p nz-col nzSpan="14">{{ contact.name }}</p>
          <p nz-col nzSpan="8">{{ contact.phone }}</p>
          <p nz-col nzSpan="2">
            <button
              nz-popconfirm
              nz-button
              (nzOnConfirm)="deleteContact()"
              nzPopconfirmTitle="Esta seguro que desea eliminar este Contacto"
            >
              <i nz-icon nzType="delete" nzTheme="outline"></i>
            </button>
          </p>
        </div>
        <mat-divider> </mat-divider>
      </mat-list-option>
    </mat-selection-list>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class ListContactsComponent implements OnInit {
  @ViewChild('list', { static: true, read: MatSelectionList })
  list!: MatSelectionList;

  @Output() deleteComment = new EventEmitter<void>();
  constructor() {}

  @Input() contacts!: IContact[] | null;

  @Output() selectItem = new EventEmitter<string>();

  ngOnInit(): void {}

  onChangue(value: MatSelectionListChange) {
    const select = value.source.selectedOptions.selected[0].value;
    this.selectItem.emit(select);
  }
  deleteContact() {
    this.deleteComment.emit();
  }
}
