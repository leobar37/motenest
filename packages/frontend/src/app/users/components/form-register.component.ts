import { map, tap } from 'rxjs/operators';
import { ContactStore } from '../services/userstore.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IContact, ModeReuForm } from '../model';

import { v4 as uuid } from 'uuid';

const labels = {
  button: {
    edit: 'Guardar cambios',
    save: 'Registrar',
  },
};

@Component({
  selector: 'app-form-register',
  template: `
    <div class="text-center">
      <h2>Register Contact</h2>
      <form nz-form [formGroup]="form" (ngSubmit)="actionSubmitForm()">
        <!-- name -->
        <nz-form-item class="px-3" nzTooltipTitle="nombre">
          <nz-form-label nzSpan="6" nzRequired> Nombre </nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="name" placeholder="Name" />
          </nz-form-control>
        </nz-form-item>
        <!-- last name -->
        <nz-form-item class="px-3" nzTooltipTitle="nombre">
          <nz-form-label nzSpan="6" nzRequired> Apellido </nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="lastName" placeholder="LastName" />
          </nz-form-control>
        </nz-form-item>
        <!-- phone -->
        <nz-form-item class="px-3" nzTooltipTitle="phone">
          <nz-form-label nzSpan="6" nzRequired> Phone </nz-form-label>
          <nz-form-control>
            <input nz-input formControlName="phone" placeholder="phone" />
          </nz-form-control>
        </nz-form-item>

        <!-- description -->
        <nz-form-item class="px-3" nzTooltipTitle="phone">
          <nz-form-label nzSpan="6" nzRequired> Description </nz-form-label>
          <nz-form-control nzSpan="24">
            <textarea nz-input formControlName="description"></textarea>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item nzJustify="center" nzGutter="8">
          <button
            class="mx-2"
            nz-button
            nzDanger
            *ngIf="edit == true"
            (click)="newRegister()"
          >
            nuevo
          </button>
          <button class="mx-2" type="submit" nz-button nzType="primary">
            {{ textButton$ | async }}
          </button>
        </nz-form-item>
      </form>
    </div>
  `,
  styles: [],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private contactStore: ContactStore) {}

  edit: boolean = false;

  textButton$ = this.contactStore.selectModeForm.pipe(
    tap((mode) => {
      mode == ModeReuForm.CREATE ? (this.edit = false) : (this.edit = true);
      if (!this.edit) {
        this.form.reset();
      }
    }),
    map((mode) =>
      mode == ModeReuForm.CREATE ? labels.button.save : labels.button.edit
    )
  );

  @Output() submitForm = new EventEmitter<IContact>();
  @Output() editForm = new EventEmitter<IContact>();

  @Input() set contact(co: IContact) {
    if (co)
      this.form.patchValue({
        name: co.name,
        lastName: co.lastName,
        phone: co.phone,
        description: co.description,
      });
  }

  ngOnInit(): void {
    this.buildForm();
  }
  public newRegister() {
    this.contactStore.patchState({
      selectId: null,
    });
    this.form.reset();
  }
  public actionSubmitForm() {
    if (!this.form.valid) {
      this.contactStore.updateError(
        'El formulario no es valido, por favor complete todos los campos'
      );
      return;
    }
    let value = this.form.value as IContact;
    if (!this.edit) {
      value.id = uuid();
      this.submitForm.emit(value);
    } else {
      this.editForm.emit(value);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
}
