import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPlayerComponent } from './view-player/view-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material/material.module';
import { YouTubePlayerModule } from '@angular/youtube-player';



@NgModule({
  declarations: [
    ViewPlayerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    YouTubePlayerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[ViewPlayerComponent]
})
export class PlayerModule { }
