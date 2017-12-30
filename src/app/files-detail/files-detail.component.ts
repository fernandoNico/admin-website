import { Component, Input } from '@angular/core';
import { MyfilesService } from 'app/myfiles.service';
import { UploadFile } from 'app/eventfiles/file';
@Component({
  selector: 'files-detail',
  templateUrl: './files-detail.component.html',
  styleUrls: ['./files-detail.component.scss']
})
export class FilesDetailComponent {

@Input() upload: UploadFile;

constructor(private upSvc: MyfilesService) { }
  deleteUpload() {
    this.upSvc.deleteUpload(this.upload);
  }
}




 

