import { Component } from '@angular/core';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})
export class ViewPlayerComponent {
  palavras: string[] = ["Esse", "é", "o", "caminho", "de", "um", "shinobi"]
}
