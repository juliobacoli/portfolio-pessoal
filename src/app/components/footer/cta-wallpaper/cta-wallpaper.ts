import { Component, HostListener, OnInit } from '@angular/core';

const OVAL_WIDTH = 220;
const OVAL_HEIGHT = 80;
const GAP = 40;

@Component({
  selector: 'app-cta-wallpaper',
  templateUrl: './cta-wallpaper.html',
  styleUrl: './cta-wallpaper.scss',
})
export class CtaWallpaper implements OnInit {
  ovals: number[] = [];

  ngOnInit(): void {
    this.calculate();
  }

  @HostListener('window:resize')
  calculate(): void {
    this.ovals = Array(16).fill(0);
  }
}
