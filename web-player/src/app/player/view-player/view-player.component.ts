import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})
export class ViewPlayerComponent implements OnInit {
  @ViewChild('youtubeVideo') youtubeVideo: ElementRef | undefined;
  @ViewChild('player') child_component!: YouTubePlayer;

  episode: any;
  currentTime: number = 0;
  apiLoaded = false;
  currentVid = "_f7AkEdmqpI"

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchEpisode();
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

 
  someMethod(){
    this.child_component.getCurrentTime(); // Or any public method
  } 

  searchEpisode() {
    this.apollo.watchQuery({
      query: gql`
        query episodeById($id: ID!) {
          episodeById(id: $id) {
            id
            title
            description
            mediaUrl
            podcast {
              id
              title
              description
            }
            transcript {
              lines {
                text
                start

              }
            }
          }
        }
      `,
      variables: {
        id: parseInt(this.route.snapshot.params['episode_id'])
      }
    })
      .valueChanges.subscribe((result: { data: any; }) => {
        console.log(result.data['episodeById']);
        this.episode = result.data['episodeById'];
      });
  }

  getVideoId(url: string): string {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : '';
  }

  getSafeMediaUrl(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}