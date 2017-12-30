export class UploadFile {
    $key: string;
    file: File;
    name: string;
    url: string;
    id: number;
    progress: number;
    
    createdAt: Date = new Date();
  
    constructor(file: File) {
      this.file = file;
    }
  }
  