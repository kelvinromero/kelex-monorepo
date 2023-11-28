import { Component } from '@angular/core';
import { GraphqlService } from 'src/app/shared/services/episodes.service';

@Component({
  selector: 'app-list-episode',
  templateUrl: './list-episode.component.html',
  styleUrls: ['./list-episode.component.scss']
})
export class ListEpisodeComponent {
  episodes$: any;

  constructor(private graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.episodes$ = this.graphqlService.getEpisodes();
    console.log(this.episodes$)
  }
}
