import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

///// Start FireStarter

// Core
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { ItemModule } from './items/shared/item.module';
import { UploadModule } from './uploads/shared/upload.module';
import { UiModule } from './ui/shared/ui.module';
import { NotesModule } from './notes/notes.module';
///// End FireStarter


import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'app/event.service';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EditSubeventsComponent } from './edit-subevents/edit-subevents.component';
import { EventfilesComponent } from './eventfiles/eventfiles.component';
import { FilesDetailComponent } from './files-detail/files-detail.component';
import { MyfilesService } from 'app/myfiles.service';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { EventVideosComponent } from './event-videos/event-videos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    EditEventComponent,
    NewEventComponent,
    EditSubeventsComponent,
    EventfilesComponent,
    FilesDetailComponent,
    UploadFilesComponent,
    EventVideosComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ItemModule,
    UploadModule,
    UiModule,
    NotesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCA20_4EESP91_VCovXIqtbMWrRjWnuD8g'
    })
  ],
  providers: [EventService, MyfilesService],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
