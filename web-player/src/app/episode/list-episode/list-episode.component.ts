import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import {NgFor} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-episode',
  templateUrl: './list-episode.component.html',
  styleUrls: ['./list-episode.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink, HttpClientModule]
})
export class ListEpisodeComponent implements OnInit{
  episodes: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(){
    this.apollo.watchQuery({
      query: gql`
      {
        episodes {
          id
          title
          description
          podcast {
            id
            title
            description
          }
        }
      }`
    }).valueChanges.subscribe((result: { data: any; }) => {
      console.log(result.data['episodes']);
      this.episodes = result.data['episodes'];
    });
  }
}
