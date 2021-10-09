import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { label } from '@motenest/admin/home';
import { label as datoLabel } from '@motenest/admin/dato';
@Component({
  selector: 'tau-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent implements OnInit {
  title = label + datoLabel;
  constructor() {}

  ngOnInit(): void {}
}
