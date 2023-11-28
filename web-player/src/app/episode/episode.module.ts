import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEpisodeComponent } from './list-episode/list-episode.component';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GraphQLModule } from '../graphql.module';



@NgModule({
  declarations: [
    ListEpisodeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    GraphQLModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[ListEpisodeComponent]
})
export class EpisodeModule { }
