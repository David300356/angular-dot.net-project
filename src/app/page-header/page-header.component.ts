import { Component, EventEmitter, Output } from '@angular/core';
import { PoliceService } from '../police.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Output() menuClicked = new EventEmitter<boolean>();
  constructor(public api: PoliceService,private router: Router) {}

  logOut() {
    this.api.deleteToken();
    this.router.navigate(['/login'])
  }
}
