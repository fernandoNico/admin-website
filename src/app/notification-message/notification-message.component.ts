import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/notification.service';


@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent implements OnInit {

  constructor(public notify:  NotificationService) { }

  ngOnInit() {
  }

}
