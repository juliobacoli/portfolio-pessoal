import { Component, inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Header } from './components/header/header/header';
import { HeroSection } from './sections/hero-section/hero-section';
import { ProjectsGrid } from './sections/projects-grid/projects-grid';
import { Footer } from './components/footer/footer/footer';
import { ProjectsService } from './services/projects';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  imports: [Header, HeroSection, ProjectsGrid, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected projectsService = inject(ProjectsService);
  private lenis?: Lenis;
  private el = inject(ElementRef);
  private clickListener?: (e: MouseEvent) => void;

  ngOnInit() {
    this.lenis = new Lenis({
      autoRaf: true,
    });

    // Intercepta os cliques nos links com # (âncoras) para usar o scroll suave do Lenis
    this.clickListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        this.lenis?.scrollTo(anchor.hash, { offset: -80 }); // -80 para descontar o tamanho do header!
      }
    };
    
    this.el.nativeElement.ownerDocument.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.el.nativeElement.ownerDocument.removeEventListener('click', this.clickListener);
    }
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}
