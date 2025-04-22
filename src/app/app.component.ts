import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebRTCPlayer } from '@eyevinn/webrtc-player';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  whepUrl: string = `${window.location.href}whep`;
  player: WebRTCPlayer | null = null;
  @ViewChild('videoPlayer') videoElementRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoElementRef?.nativeElement;
    if (!video) {
      console.error('Video element not found!');
      return;
    }
    this.player = new WebRTCPlayer({
      video: video,
      type: 'whep',
      statsTypeFilter: '^candidate-*|^inbound-rtp',
    });
  }
  play(): void {
    if (this.player) {
      this.player.load(new URL(this.whepUrl));
    }
  }
  stop(): void {
    if (this.player) {
      this.player.unload();
    }
  }
  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }
}
