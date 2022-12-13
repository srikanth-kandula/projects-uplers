import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SocialComponent } from './app.component';
//import { SocialComponentCopy } from './app.component copy';

@NgModule({
  declarations: [
    SocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [SocialComponent]
})
export class AppModule { }
