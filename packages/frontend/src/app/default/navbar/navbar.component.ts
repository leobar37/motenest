import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nz-header nz-row nzJustify="start" nzGutter="8">
      <h1 class="text-white pt-2">Redux Learning</h1>
    </nz-header>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
