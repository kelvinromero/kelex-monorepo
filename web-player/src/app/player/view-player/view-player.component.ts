import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})
export class ViewPlayerComponent implements OnInit {
  @ViewChild('youtubeVideo') youtubeVideo: ElementRef | undefined;
  episode: any;
  currentTime: number = 0;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchEpisode();
    this.loadYouTubeAPI();
  }

  private loadYouTubeAPI() {
    (window as any).onYouTubeIframeAPIReady = () => {
      this.createYouTubePlayer();
    };
  }

  private createYouTubePlayer() {
    const player = new (window as any).YT.Player(this.youtubeVideo?.nativeElement, {
      events: {
        onReady: () => {
          // Lógica adicional quando o player estiver pronto
        },
        onStateChange: (event: any) => {
          if (event.data === (window as any).YT.PlayerState.PLAYING) {
            setInterval(() => {
              this.currentTime = player.getCurrentTime();
            }, 1000);
          }
        },
      },
    });
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

  getSafeMediaUrl(url: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}