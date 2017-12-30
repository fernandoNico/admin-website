import { Component, OnInit } from '@angular/core';


import { MyfilesService } from 'app/myfiles.service';
import { UploadFile } from 'app/eventfiles/file';


@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent {

  selectedFiles: FileList | null;
  currentUpload: UploadFile;

  constructor(private upSvc: MyfilesService) { }

  detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new UploadFile(file.item(0));
      this.upSvc.pushUpload(this.currentUpload);
    } else {
      console.error('No file found!');
    }
  }

  uploadMulti() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new UploadFile(file);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
