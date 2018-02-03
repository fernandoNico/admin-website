import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { UploadFile } from 'app/eventfiles/file';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { AuthService } from 'app/core/auth.service';
import { Item } from 'app/items/shared/item';

@Injectable()
export class MyfilesService {
  basePath = 'uploads';
  basePathEventImage = 'eventImages';
  basePathImages = 'Images';
  uploadsRef: AngularFireList<Item>;

  uploads: Observable<UploadFile[]>;

  constructor(private db: AngularFireDatabase, public auth: AuthService ) { 

    this.uploadsRef = db.list('/eventImages');
  }

  createItem(item: Item): void {
    this.uploadsRef.push(item);
  }

  getEventImage(id: number) {
    this.uploads = this.db.list(this.basePathEventImage, ref=> ref.orderByChild('id').equalTo(id)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  getEventsImages() {
    this.uploads = this.db.list(this.basePathEventImage, ref=> ref.orderByChild('id')).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  getUploads(id: string) {
    this.uploads = this.db.list(this.basePath, ref=> ref.orderByChild('id').equalTo(id)).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  deleteUpload(upload: UploadFile) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name);
    })
    .catch((error) => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: UploadFile, eventid: number) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.id = eventid;
          this.saveFileData(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  





  pushNewImageUpload(upload: UploadFile, eventid: any) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePathEventImage}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.id = eventid;
          // this.auth.updateItem(this.auth.currentUserId, { photoURL: upload.url });
          this.saveProfilePictures(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }


  updateEventImage(upload: UploadFile, key: any) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePathImages}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.updateItem(key, { imageurl: upload.url });
          this.saveImages(upload);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  updateItem(key: string, value: any): void {
    this.uploadsRef.update(key, value)
  }

  private saveImages(upload: UploadFile) {
    this.db.list(`${this.basePathImages}/`).push(upload);
  }

  private saveProfilePictures(upload: UploadFile) {
    this.db.list(`${this.basePathEventImage}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: UploadFile) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
