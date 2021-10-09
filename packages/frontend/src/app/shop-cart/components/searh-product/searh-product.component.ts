import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searh-product',
  template: `
    <div class="search">
      <nz-space nzAlign="start">
        <form *nzSpaceItem style="width : 500px">
          <nz-form-control>
            <input nz-input nzSize="large" />
          </nz-form-control>
        </form>
        <button *nzSpaceItem nz-button nzType="primary" nzSize="large">
          search
        </button>
      </nz-space>
    </div>
  `,
  styleUrls: [`../../styles/search.styles.scss`],
})
export class SearhProductComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
