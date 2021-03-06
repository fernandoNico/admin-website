import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  
    // show = false;
  
    title = 'MyEvent';
  
    constructor(public auth: AuthService) { }
  
    // toggleCollapse() {
    //   this.show = !this.show
    // }
  
    logout() {
      this.auth.signOut();
    }
  
  }
