import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  constructor(private activateRotue: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}
  routerMove(app: string) {
    app = '/'.concat(app);
    this.router.navigate([app]);
  }
}
