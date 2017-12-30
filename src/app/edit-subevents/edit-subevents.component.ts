import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { SubEvent } from "./SubEvent.model";
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'app/event.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const now = new Date();

@Component({
  selector: 'edit-subevents',
  templateUrl: './edit-subevents.component.html',
  styleUrls: ['./edit-subevents.component.scss']
})
export class EditSubeventsComponent implements OnInit {

  @Output() actionMessage = new EventEmitter();
  
  statusMessage: string;
  innerEvents: SubEvent[];
  subEventToedit: SubEvent;

 



  constructor( private eventService: EventService,
     private activatedRoute: ActivatedRoute,
     private ngbDateParserFormatter: NgbDateParserFormatter) {

      this.getSuvEvents();
      }

  ngOnInit() {
   
    this.subEventModelStart = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.subEventModelEnd = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  showInnerEventTab =false;
  editsubevent = false;
  newSubevent(){
    this.showInnerEventTab = !this.showInnerEventTab;
    
      if (this.showInnerEventTab) {
        this.editsubevent = false;
      }
    }

    subEventModelStart: NgbDateStruct;
    subEventModelEnd: NgbDateStruct;

    parentEventID:number;
    getSuvEvents() {
      var  ParentEventId: any = this.activatedRoute.snapshot.params['id'];
      this.parentEventID = ParentEventId;
      this.eventService.getSubEvents(ParentEventId).subscribe(
        (eventData) => {
          if (eventData == null) {
            this.statusMessage = 'Event with given id does not exits' ;
          }else {
          this.innerEvents =  eventData;
          console.log(this.innerEvents);
        } 
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );
    
  }

  meridian = true;

  InnerEventStart_model:any;
  InnerEventEnd_model :any;

  InnerEventStart_time:any;
  InnerEventEnd_time:any;

  startDate: string;
  endDate: string;

  addedsubEvent = 'add';
  editededsubEvent = 'edit';
  deletedsubEvent = 'delete';
  


  editinnerEvent(innerevents:SubEvent) {
        this.subEventToedit =  innerevents;
        // this.editsubevent = true;

        this.startDate =this.subEventToedit.innerEventStartDate;
        this.endDate = this.subEventToedit.innerEventEndDate;

        var yearStart =  (this.startDate).substr(0,4);
        var monthStart =  (this.startDate).substr(5,2);
        var dayStart =  (this.startDate).substr(8,2);
        var hourStart =  (this.startDate).substr(11,2);        
        var minStart =  (this.startDate).substr(14,2);

        var yearEnd =  (this.endDate).substr(0,4);
        var monthEnd =  (this.endDate).substr(5,2);
        var dayEnd =  (this.endDate).substr(8,2);
        var hourEnd =  (this.endDate).substr(11,2);        
        var minEnd =  (this.endDate).substr(14,2);
      
        this.InnerEventStart_model= { year: yearStart, month: monthStart, day: dayStart };
        this.InnerEventStart_time= {hour: hourStart, minute: minStart, second: 30};
      
        this.InnerEventEnd_model= { year: yearEnd, month: monthEnd, day: dayEnd };
        this.InnerEventEnd_time= {hour: hourEnd, minute: minEnd, second: 30};




        this.editsubevent = true;
        if (this.showInnerEventTab) {
          this.showInnerEventTab = false;
        }
        
      }






      subeventToUpdate: SubEvent;
      subEventDateTimeStart: string;
      subEventDateTimeEnd: string;
      subEventTimeStart= {hour: 11, minute: 31, second: 30};
      subEventTimeEnd= {hour: 12, minute: 31, second: 30};
      
      addSubEvent(title: string , eventDescription: string) {
        
      
        
          this.subEventDateTimeStart = this.ngbDateParserFormatter.format(this.subEventModelStart) +" "+ this.subEventTimeStart.hour +":"+  this.subEventTimeStart.minute+":"+ this.subEventTimeStart.second;
          this.subEventDateTimeEnd = this.ngbDateParserFormatter.format(this.subEventModelEnd)  +" "+ this.subEventTimeEnd.hour +":"+  this.subEventTimeEnd.minute+":"+ this.subEventTimeEnd.second;
      
          console.log(title );
          console.log(eventDescription);
          console.log(this.subEventDateTimeStart );
          console.log(this.subEventDateTimeEnd);
      
      
          this.subeventToUpdate =  new  SubEvent(title, this.subEventDateTimeStart, this.subEventDateTimeEnd, 
            eventDescription,this.parentEventID);
          console.log(this.subeventToUpdate);
          this.eventService.addSubEvents(this.subeventToUpdate).subscribe((response)=>{
            console.log(response);

            // this.getSuvEvents();
            this.innerEvents.unshift(response);
            this.actionMessage.emit(this.addedsubEvent);
            // console.log('s');
            console.log(this.innerEvents);
            // this.NewsubEvent = false;
            // setTimeout(() => this.NewsubEvent = true, 8000);
      
          });
      
      
      
        //   console.log(this.eventToUpdateId);
      
        //   this.eventService.updateEvent(this.eventToUpdate, this.llave)
        //   .subscribe((response)=>{
        //       console.log(response);
        //       // this.router.navigate(['event/', title,'edited']);
        //            this.staticAlertClosed1 = false;
        //     setTimeout(() => this.staticAlertClosed1 = true, 8000);
        //       });
        // }
      
      
         
        }

        SubEventToUpdate: SubEvent;
        ConfirmChanges(title: string, description: string) {
          
      
        this.subEventDateTimeStart = this.ngbDateParserFormatter.format(this.InnerEventStart_model) +" "+ this.InnerEventStart_time.hour +":"+  this.InnerEventStart_time.minute+":"+ this.InnerEventStart_time.second;
        this.subEventDateTimeEnd = this.ngbDateParserFormatter.format(this.InnerEventEnd_model)  +" "+ this.InnerEventEnd_time.hour +":"+  this.InnerEventEnd_time.minute+":"+ this.InnerEventEnd_time.second;
      
        // let nose =  title +" "+ description;
        //   console.log(nose);
        console.log(this.subEventDateTimeStart);
        console.log(this.subEventDateTimeEnd);
      
      
      
        this.SubEventToUpdate =  new SubEvent(title,this.subEventDateTimeStart,this.subEventDateTimeEnd,  description, this.subEventToedit.EventId );
        
      
        console.log(this.SubEventToUpdate);
        this.eventService.updateSubEvent( this.SubEventToUpdate, this.subEventToedit.innerEventID)
        .subscribe((response)=>{
            console.log(response);

            let itemIndex = this.innerEvents.findIndex(item => item.innerEventID == response.innerEventID);
            this.innerEvents[itemIndex] = response;

            this.actionMessage.emit(this.editededsubEvent);


           
        });
      
      
      
        // console.log(this.eventToUpdateId);
      
        // this.eventService.updateEvent(this.eventToUpdate, this.llave)
        // .subscribe((response)=>{
        //     console.log(response);
        //     // this.router.navigate(['event/', title,'edited']);
        //          this.staticAlertClosed1 = false;
        //   setTimeout(() => this.staticAlertClosed1 = true, 8000);
        //     });
      
        }








      SubEventToDeleteId:number;
      deleteinnerEvent(innerevents : SubEvent) {
       this.SubEventToDeleteId = innerevents.innerEventID;
    
        this.eventService.deleteSubEvent(this.SubEventToDeleteId).subscribe(
          result => console.log(result));  
    
        let indexToDelete = this.innerEvents.indexOf(innerevents);
        if (indexToDelete !== -1) {
          this.innerEvents.splice(indexToDelete, 1);
        }
        this.actionMessage.emit(this.deletedsubEvent);

        // this.DeletesubEvent = false;
        // setTimeout(() => this.DeletesubEvent = true, 8000);
      }
    





}
