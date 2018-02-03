import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from 'app/ui/user-profile/user-profile.component';
import { HomeComponent } from 'app/home/home.component';
import { EventsPageComponent } from 'app/ui/events-page/events-page.component';
import { HelpComponent } from 'app/help/help.component';
import { NewEventComponent } from 'app/new-event/new-event.component';
import { EditEventComponent } from 'app/edit-event/edit-event.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: NewEventComponent, canActivate: [AuthGuard]},
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserLoginComponent },
  { path: 'events-list', component: EventsPageComponent },
  { path: 'help', component: HelpComponent },
  { path: 'event/:id', component: EditEventComponent },
  { path: 'event/:id/:added', component: EditEventComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'items', component: ItemsListComponent, canActivate: [AuthGuard] },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
