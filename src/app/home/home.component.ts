import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private notify: NotificationService ) {
    this.notify.clear();
  }
  ngOnInit() {
  }

}