export class UploadFile {
    $key: string;
    file: File;
    name: string;
    url: string;
    id?: Number;
    progress: number;
    
    createdAt: Date = new Date();
  
    constructor(file: File) {
      this.file = file;
    }
  }

  export class UploadFiles {
    $key: string;
    file: File;
    name: string;
    url: string;
    eventid: Number;
    progress: number;
    
    createdAt: Date = new Date();
  
    constructor(file: File) {
      this.file = file;
    }
  }
  