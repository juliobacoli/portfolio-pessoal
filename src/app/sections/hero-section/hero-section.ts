import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  heroText = input<string>('');
  clientName = input<string>('');
  clientUrl = input<string>('');
}
