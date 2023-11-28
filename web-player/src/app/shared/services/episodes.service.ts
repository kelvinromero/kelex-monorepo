
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      id
      title
      description
      podcast {
        id
        title
      }
    }
  }
`;
@Injectable({
  providedIn: 'root',
})

export class GraphqlService {
  constructor(private apollo: Apollo) {}
  loading!: boolean;
  episodes: any;

  getEpisodes() {
    this.apollo
    .watchQuery<any>({
      query: GET_EPISODES,
    })
    .valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.episodes = data.episodes;
      console.log(data)
    });
  }
}