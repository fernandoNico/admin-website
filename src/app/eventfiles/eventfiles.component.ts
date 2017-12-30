import { Component, OnInit } from '@angular/core';
import { MyfilesService } from 'app/myfiles.service';
import { UploadFile } from 'app/eventfiles/file';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eventfiles',
  templateUrl: './eventfiles.component.html',
  styleUrls: ['./eventfiles.component.scss']
})
export class EventfilesComponent implements OnInit {
  uploads: Observable<UploadFile[]>;

  constructor(private upSvc: MyfilesService,   private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    var  eventId: number = this.activatedRoute.snapshot.params['id'];
         this.uploads = this.upSvc.getUploads(eventId.toString());
        //  this.uploads.subscribe(() => this.showSpinner = false);
  }

}



// import { Component, OnInit } from '@angular/core';

// import { UploadService } from '../shared/upload.service';
// import { Upload } from '../shared/upload';

// import { Observable } from 'rxjs/Observable';

// @Component({
//   selector: 'uploads-list',
//   templateUrl: './uploads-list.component.html',
//   styleUrls: ['./uploads-list.component.scss'],
// })
// export class UploadsListComponent implements OnInit {

//   uploads: Observable<Upload[]>;
//   showSpinner = true;

//   constructor(private upSvc: UploadService) { }

//   ngOnInit() {
//     this.uploads = this.upSvc.getUploads();
//     this.uploads.subscribe(() => this.showSpinner = false);
//   }
// }