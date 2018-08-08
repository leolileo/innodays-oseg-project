import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

<<<<<<< Updated upstream
import {AppComponent} from './app.component';
import {ContactDetailsComponent} from './contacts/contact-details/contact-details.component';
import {ContactListComponent} from './contacts/contact-list/contact-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NotfoundComponent} from './notfound/notfound.component';
import {LandingpageComponent} from './landingpage/landingpage.component';

const appRoutes: Routes = [
  {path: 'crisis-center', component: NotfoundComponent},
  {path: 'hero/:id', component: NotfoundComponent},
  {
    path: '',
    component: LandingpageComponent,
    data: {title: 'Heroes List'}
  },
/*  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },*/
  {path: '**', component: NotfoundComponent}
];
=======
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './main/contact-details/contact-details.component';
import { ContactListComponent } from './main/contact-list/contact-list.component';
import { CommentComponent } from './comment/comment.component';
import { MainModuleListComponent } from './main/main-module-list/main-module-list.component';
import { MainModuleIntroComponent } from './main/main-module-intro/main-module-intro.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
<<<<<<< Updated upstream
    NotfoundComponent,
    LandingpageComponent,
    LandingpageComponent
=======
    CommentComponent,
    MainModuleListComponent,
    MainModuleIntroComponent
>>>>>>> Stashed changes
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
<<<<<<< Updated upstream
export class AppModule {
}
=======
export class AppModule { }
>>>>>>> Stashed changes
