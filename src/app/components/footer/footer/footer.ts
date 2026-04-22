import { Component } from '@angular/core';
import { CtaWallpaper } from '../cta-wallpaper/cta-wallpaper';
import { FooterBar } from '../footer-bar/footer-bar';

@Component({
  selector: 'app-footer',
  imports: [CtaWallpaper, FooterBar],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
