import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPlayerComponent } from './player/view-player/view-player.component';
import { ListEpisodeComponent } from './episode/list-episode/list-episode.component';

const routes: Routes = [
  {
    path: 'player/episode',
    children: [
      {
        path: ':episode_id',
        component: ViewPlayerComponent,
      },
    ]
  },
  {
    path: '',
    component: ListEpisodeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
