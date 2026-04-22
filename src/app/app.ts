import { Component } from '@angular/core';
import { Header } from './components/header/header/header';
import { HeroSection } from './sections/hero-section/hero-section';

@Component({
  selector: 'app-root',
  imports: [Header, HeroSection],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
