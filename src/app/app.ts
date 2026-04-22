import { Component, inject } from '@angular/core';
import { Header } from './components/header/header/header';
import { HeroSection } from './sections/hero-section/hero-section';
import { ProjectsGrid } from './sections/projects-grid/projects-grid';
import { Footer } from './components/footer/footer/footer';
import { ProjectsService } from './services/projects';

@Component({
  selector: 'app-root',
  imports: [Header, HeroSection, ProjectsGrid, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected projectsService = inject(ProjectsService);
}
