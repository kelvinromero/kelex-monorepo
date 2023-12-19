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
  @ViewChild('player') player!: YouTubePlayer;

  episode: any;
  transcript_line: string[] = [];
  currentTime: number = 0;
  apiLoaded = false;
  question: string = ''
  chat: { content: string; role: string }[] = [];

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


  onPlayerStateChange(event?: any) {

    if (event.data === YT.PlayerState.PLAYING) {
      setInterval(() => {
        const currentTime = this.player.getCurrentTime();
        this.updateTranscription(currentTime);
      }, 1000); // Update every second (adjust as needed)
    }
    // Handle other player state changes if necessary
  }

  updateTranscription(currentTime: number) {
    const currentLine = this.episode.transcript.lines.find((line: any) => parseFloat(line.start) <= currentTime && parseFloat(line.start) + parseFloat(line.duration) >= currentTime);
    if (currentLine) {
      this.transcript_line = currentLine.text.split(" "); // You'd update your UI here
    } else {
      this.transcript_line = []
    }
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
                duration
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
        this.episode = result.data['episodeById'];
      });
  }

  searchQuestion() {
    this.apollo
      .mutate({
        mutation: gql`
          mutation chatAboutEpisode($episodeId: ID!, $message: String!) {
            chatAboutEpisode(episodeId: $episodeId, message: $message) {
              content
              role
            }
          }
        `,
        variables: {
          episodeId: parseInt(this.route.snapshot.params['episode_id']),
          message: this.question
        }
      })
      .subscribe({
        next: (result: any) => {
          const chatMessage = result.data['chatAboutEpisode'];
          this.chat.push(chatMessage);
          console.log(this.chat);
          // Limpar a pergunta após enviar
          this.question = '';
        },
        error: (error) => {
          console.error(error);
        }
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
