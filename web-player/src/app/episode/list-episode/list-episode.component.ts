import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import {NgFor} from "@angular/common";
import { RouterLink } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-episode',
  templateUrl: './list-episode.component.html',
  styleUrls: ['./list-episode.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink, HttpClientModule, FormsModule]
})
export class ListEpisodeComponent implements OnInit{
  episodes: any;
  titleEpisode: string = '';

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer) { }

  ngOnInit(){
    this.apollo.watchQuery({
      query: gql`
      {
        episodes {
          id
          title
          description
          mediaUrl
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

  getSafeMediaUrl(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  searchEpisode(){
    this.apollo.watchQuery({
      query: gql`
        query GetEpisodesByTitle($title: String!) {
          episodesByTitle(title: $title) {
            id
            title
            description
            mediaUrl
            podcast {
              id
              title
              description
            }
          }
        }
      `,
      variables: {
        title: this.titleEpisode      }
    })
    .valueChanges.subscribe((result: { data: any; }) => {
      console.log(result.data['episodesByTitle']);
      this.episodes = result.data['episodesByTitle'];
    });
    }
}
