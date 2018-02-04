import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Eventos } from '../ui/events-page/event.model';
import { Router } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'app/event.service';
import { MyfilesService } from 'app/myfiles.service';
import { Item } from 'app/items/shared/item';
import { UploadFile } from 'app/eventfiles/file';
import { NotificationService } from 'app/notification.service';


const now = new Date();

@Component({
  selector: 'new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  item: Item = new Item();
  
  AddressList: any;
  statusMessage: string;


  model: NgbDateStruct;
  model_ends: NgbDateStruct;

  
  
  dateStart: any ;
  dateEnd: any ;

  lat :number;
  lng :number ;
  zoom: number = 15;

  newEvent : Eventos;

  time = {hour: 13, minute: 30, second:30};
  time_ends = {hour: 12, minute: 20 , second:30};

  meridian = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  

  street : string;
  datetimeStart: string;
  datetimeEnd: string;

  constructor(private eventService: EventService, 
              private router: Router, 
              private itemSvc: MyfilesService,
              private ngbDateParserFormatter: NgbDateParserFormatter, private notify: NotificationService ) {
                this.notify.clear();
              }


              


  ngOnInit() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.model_ends = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  // Get the selected street address
  public onChange(event:any): void {  // event will give you full breif of action
    this.street = event.target.value;
    console.log(this.street);
  }
  
  findAddress(postocode: any) {

    this.eventService.getEventPostcode(postocode).subscribe(
      (Data) => {
        if (Data == null) {
          this.statusMessage = 'Postcode do not exist!' ;
        }else {}
        this.AddressList =  Data;
        this.lat =  this.AddressList.latitude;
        this.lng =  this.AddressList.longitude;
        this.street =this.AddressList.addresses[0];
        console.log( this.street);
        console.log(this.AddressList.addresses[0]);
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );
  }













  // hourAmStart: string = "T";
  // hourAmEnd: string = "T";
  
  addEvent(title : string ,postcode : string ,description :  string ){
   
    this.datetimeStart = this.ngbDateParserFormatter.format(this.model) +" "+ this.time.hour +":"+  this.time.minute+":"+ this.time.second;
    this.datetimeEnd = this.ngbDateParserFormatter.format(this.model_ends) +" "+ this.time_ends.hour +":"+  this.time_ends.minute+":"+ this.time_ends.second;

    // this.datetimeStart = this.ngbDateParserFormatter.format(this.model) + this.hourAmStart + this.time.hour +":"+  this.time.minute+":"+ this.time.second;
    // this.datetimeEnd = this.ngbDateParserFormatter.format(this.model_ends) + this.hourAmEnd + this.time_ends.hour +":"+  this.time_ends.minute+":"+ this.time_ends.second;

    console.log(this.datetimeStart );
    console.log(this.datetimeEnd);

    let  myString = this.street;
    let splits = myString.split(',', );
    console.log(splits)
        
    this.street = splits[0];
        // this.eventCity = splits[5];

    this.newEvent =  new Eventos(title, this.datetimeStart, this.datetimeEnd, postcode, description, this.street);
    console.log(this.newEvent);
    this.eventService.addEvent(this.newEvent)
    .subscribe((response)=>{
      console.log(response.EventId);
    console.log(response);
      if (response) {
        
          this.item.id = String(response.EventId);
          this.item.imageurl = "https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_960_720.jpg";
          this.itemSvc.createItem(this.item);
          this.item = new Item(); // reset item
        this.router.navigate(['event', response.EventId,'added']);
        }
    });
  }

 



}
