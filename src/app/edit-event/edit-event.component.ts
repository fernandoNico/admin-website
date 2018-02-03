import { Component, OnInit,Injectable } from '@angular/core';
import { EventService } from 'app/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Eventos } from '../ui/events-page/event.model';
import { element } from 'protractor';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { UploadFile } from 'app/eventfiles/file';
import { AuthService } from 'app/core/auth.service';
import { MyfilesService } from 'app/myfiles.service';
import { NotificationService } from 'app/notification.service';

@Component({
  selector: 'edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventuploads: Observable<any[]>;
  selectedFiles: FileList | null;
  currentUpload: UploadFile;

  showEventTab = false;
  showInnerEventTab =false;
  showExhibitorsTab = false;
  showAttendeesTab = false;
  showSpeakersab = false;

  added: string;
  statusMessage: string;
  postcode: string
  eventInfo: Eventos;

  justid : number;

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
    private sanitizer: DomSanitizer,
    public auth: AuthService, private upSvc: MyfilesService,
    private notify: NotificationService ) {
      this.notify.clear();
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
              //  {name:"lom", string:"8g4-Vz69xYM"},
              //  {name:"tom", string:"15gXlORbThM"},
               {name:"tom", string:"38-M5ZkYzAY"}]
            


  ngOnInit() {
    var nos = this.activatedRoute.snapshot.params['id'];
    console.log(nos)
    this.eventuploads = this.upSvc.getEventImage(nos);
    this.getEventtoEdit();
    this.added = this.activatedRoute.snapshot.params['added'];
    if(this.added === 'added'){
      this.notify.update('Event Created Successfully', 'success');
    }
}

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  vales(q: string) : Number{  
    return Number(q);
  }

  uploadSingle(key : any) {
    const file = this.selectedFiles;
    console.log(key)
    if (file && file.length === 1) {
      this.currentUpload = new UploadFile(file.item(0));
      this.upSvc.updateEventImage(this.currentUpload, key);
    
    } else {
      console.error('No file found!');
    }
  }

  getEmbedUrl(item: any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + item.string);

  }

  getEventtoEdit() {
    var  eventId: number = this.activatedRoute.snapshot.params['id'];
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
  eventToUpdate: Eventos;
  datetimeStart: string;
  datetimeEnd: string;

  updateEventInfo(title: string, postcode: string,description: string, street: string){
        this.datetimeStart = this.ngbDateParserFormatter.format(this.Start_model) +" "+ this.Start_time.hour +":"+  this.Start_time.minute+":"+ this.Start_time.second;
        this.datetimeEnd = this.ngbDateParserFormatter.format(this.End_model)  +" "+ this.End_time.hour +":"+  this.End_time.minute+":"+ this.End_time.second;
        this.eventToUpdate =  new Eventos(title,this.datetimeStart,this.datetimeEnd, postcode, description, street);
        console.log(this.eventToUpdate);
        this.eventService.updateEvent(this.eventToUpdate, this.EventId)
        .subscribe((response)=>{
            console.log(response);
            this.notify.update('Event Updated Successfully', 'info');
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
