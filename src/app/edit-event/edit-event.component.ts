import { Component, OnInit,Injectable } from '@angular/core';
import { EventService } from 'app/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';



import { Event } from '../ui/events-page/event.model';
import { log } from 'util';

@Component({
  selector: 'edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  showEventTab = false;
  showInnerEventTab =false;
  showExhibitorsTab = false;
  showAttendeesTab = false;
  showSpeakersab = false;

  added: string;
  statusMessage: string;
  postcode: string
  eventInfo: Event;

  EventId: number;
  AddressList: any;

  lat: number;
  lng: number ;
  zoom = 15;

   
  Start_model:any;
  Start_time:any;
  End_model:any;
  End_time:any;

  staticAlertClosed = true;
  staticAlertClosed1 = true;

  NewsubEvent= true;
  EditsubEvent= true;
  DeletesubEvent = true;

  selectnewAddress = false;
  meridian = true;

  constructor(  private eventService: EventService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private sanitizer: DomSanitizer ) {
    
    }

    toggleMeridian() {
      this.meridian = !this.meridian;
  }



  editedAction(message:any){
    if (message == 'add') {
      this.NewsubEvent = false;
      setTimeout(() => this.NewsubEvent = true, 8000);
    }
    if (message == 'edit') {
      this.EditsubEvent = false;
      setTimeout(() => this.EditsubEvent = true, 8000);
    }
    if (message == 'delete') {
      this.DeletesubEvent = false;
      setTimeout(() => this.DeletesubEvent = true, 8000);
    }
  }

  videolist = [{name:"Fer", string:"6wD4V0rvlDI"},
               {name:"car", string:"6q5smuwgARY"},
               {name:"lom", string:"8g4-Vz69xYM"},
               {name:"tom", string:"15gXlORbThM"},
               {name:"tom", string:"38-M5ZkYzAY"}]
            


  ngOnInit() {
      
      
        // subEventModelStart: NgbDateStruct;
        // subEventModelEnd: NgbDateStruct;
          // this.subEventModelStart = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
          // this.subEventModelEnd = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
      
      
          this.getEventtoEdit();
          // this.getSuvEvents();
          this.added = this.activatedRoute.snapshot.params['added'];
          // this.edited = this.activatedRoute.snapshot.params['edited'];
      
        //   if(this.added === 'edited'){
        //     this.staticAlertClosed1 = false;
        //     setTimeout(() => this.staticAlertClosed1 = true, 8000);
        //     // this.staticAlertClosed1 = true;
        //  }
      
          if(this.added === 'added'){
             this.staticAlertClosed = false;
             setTimeout(() => this.staticAlertClosed = true, 8000);
          }
      
      
        }


        getEmbedUrl(item: any){
          return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.string);
      
        }

        getEventtoEdit() {
          var  eventId: number = this.activatedRoute.snapshot.params['id'];
          console.log(eventId);
          
          this.eventService.getEventById(eventId).subscribe(
            (eventData) => {
              if (eventData == null) {
                this.statusMessage = 'Event with given id does not exits' ;
              }else {
              this.eventInfo =  eventData;
              console.log(this.eventInfo); 
              this.postcode =  this.eventInfo.eventPostcode;
              console.log( this.postcode); 
              this.findAddress(this.postcode);
      
      
              this.EventId =  this.eventInfo.EventId;
      
              var yearStart =  (this.eventInfo.eventStartDate).substr(0,4);
              var monthStart =  (this.eventInfo.eventStartDate).substr(5,2);
              var dayStart =  (this.eventInfo.eventStartDate).substr(8,2);
              var hourStart =  (this.eventInfo.eventStartDate).substr(11,2);        
              var minStart =  (this.eventInfo.eventStartDate).substr(14,2);
      
              var yearEnd =  (this.eventInfo.eventEndDate).substr(0,4);        
              var monthEnd =  (this.eventInfo.eventEndDate).substr(5,2);
              var dayEnd =  (this.eventInfo.eventEndDate).substr(8,2);
              var hourEnd =  (this.eventInfo.eventEndDate).substr(11,2);
              var minEnd =  (this.eventInfo.eventEndDate).substr(14,2);
             
              this.Start_model= { year: yearStart, month: monthStart, day: dayStart };
              this.Start_time= {hour: hourStart, minute: minStart, second: 30};
            
              this.End_model= { year: yearEnd, month: monthEnd, day: dayEnd };
              this.End_time= {hour: hourEnd, minute: minEnd, second: 30};
              } 
            },
            (error) => {
              this.statusMessage = 'Problem with the service';
              console.log(error);
            }
          );
          
        }
        
        eventToUpdateId:number;
        eventToUpdate: Event;
        datetimeStart: string;
        datetimeEnd: string;
        updateEventInfo(title: string, postcode: string,description: string, street: string){
          
              // if(this.Start_time.hour < 10){this.hourAmStart = "T0"; } 
              // if(this.End_time.hour < 10){this.hourAmEnd = "T0"; }
          
              this.datetimeStart = this.ngbDateParserFormatter.format(this.Start_model) +" "+ this.Start_time.hour +":"+  this.Start_time.minute+":"+ this.Start_time.second;
              this.datetimeEnd = this.ngbDateParserFormatter.format(this.End_model)  +" "+ this.End_time.hour +":"+  this.End_time.minute+":"+ this.End_time.second;
          
              console.log(this.datetimeStart );
              console.log(this.datetimeEnd);
          
              // this.eventToUpdateId = this.activatedRoute.snapshot.params['id'];
              this.eventToUpdate =  new Event(title,this.datetimeStart,this.datetimeEnd, postcode, description, street);
              console.log(this.eventToUpdate);
              // console.log(this.eventToUpdateId);
          
              this.eventService.updateEvent(this.eventToUpdate, this.EventId)
              .subscribe((response)=>{
                  console.log(response);
                  // this.router.navigate(['event/', title,'edited']);
                       this.staticAlertClosed1 = false;
                setTimeout(() => this.staticAlertClosed1 = true, 8000);
                  });
            }



 findAddress(postcode: string) {
  this.eventService.getEventPostcode(postcode).subscribe(
    (Data) => {
      if (Data == null) {
        this.statusMessage = 'Postcode do not exist!' ;
      }else {}
      this.AddressList =  Data;
      this.lat =  this.AddressList.latitude;
      this.lng =  this.AddressList.longitude;
      console.log(this.AddressList);
    },
    (error) => {
      this.statusMessage = 'Problem with the service';
      console.log(error);
    }
  );
}




findnewAddress(postcode: string) {
  this.eventService.getEventPostcode(postcode).subscribe(
    (Data) => {
      if (Data == null) {
        this.statusMessage = 'Postcode do not exist!' ;
      }else {}
      this.AddressList =  Data;
      this.lat =  this.AddressList.latitude;
      this.lng =  this.AddressList.longitude;
      console.log(this.AddressList);
      this.selectnewAddress = true;
      console.log(this.selectnewAddress);
    },
    (error) => {
      this.statusMessage = 'Problem with the service';
      console.log(error);
    }
  );
}



videopath(path: any){
let sampleUrl =  path;
var video_id = sampleUrl.split("v=")[1].substring(0, 11)

this.videolist.unshift({name: path, string : video_id});
console.log(video_id);
}


//////////////////////////////
}
