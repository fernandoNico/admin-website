import { Component, OnInit, Injectable } from '@angular/core';
import { Eventos } from './event.model';
import { Http, Response} from '@angular/http';
import { EventService } from 'app/event.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { MyfilesService } from 'app/myfiles.service';
import { NotificationService } from 'app/notification.service';


@Component({
  selector: 'events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  events: Eventos[];
  selectedEvent: Eventos;

  eventsImages: Observable<any[]>;

  toDeleteId:number;

  constructor(private eventService: EventService, private upSvc: MyfilesService, private notify: NotificationService) { 
    this.notify.clear();
  }

  ngOnInit() {

    this.eventsImages = this.upSvc.getEventsImages();

    this.eventService.getEvents().subscribe(events => this.events = events);
  }
val(num: any){
  return(num)
}

  onselectedEvent(event: Eventos) {
  this.selectedEvent =  event;
  }

  deleteEvent(event: Eventos){
    this.toDeleteId = event.EventId;
    
    this.eventService.deleteEvent(this.toDeleteId).subscribe(
    result => console.log(result));  

    let indexToDelete = this.events.indexOf(event);
      if (indexToDelete !== -1) {
        this.events.splice(indexToDelete, 1);
        this.notify.update('Event Deleted Successfully', 'danger');
      }
    
    console.log(this.toDeleteId);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
}

}
