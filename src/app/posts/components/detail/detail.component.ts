import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

  state$: Observable<object>;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
  }

}
