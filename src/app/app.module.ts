import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

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

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactListComponent,
    NotfoundComponent,
    LandingpageComponent,
    LandingpageComponent
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
export class AppModule {
}
