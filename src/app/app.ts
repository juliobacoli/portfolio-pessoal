import { Component, inject, OnInit, OnDestroy, ElementRef, effect } from '@angular/core';
import { Header } from './components/header/header/header';
import { HeroSection } from './sections/hero-section/hero-section';
import { ProjectsGrid } from './sections/projects-grid/projects-grid';
import { Footer } from './components/footer/footer/footer';
import { ContactModal } from './components/contact-modal/contact-modal';
import { ProjectsService } from './services/projects';
import { ContactModalState } from './services/contact-modal-state';
import { MetricsService } from './services/metrics';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  imports: [Header, HeroSection, ProjectsGrid, Footer, ContactModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected projectsService = inject(ProjectsService);
  private modalState = inject(ContactModalState);
  private metricsService = inject(MetricsService);
  private lenis?: Lenis;
  private el = inject(ElementRef);
  private clickListener?: (e: MouseEvent) => void;

  constructor() {
    effect(() => {
      const open = this.modalState.isOpen();
      if (!this.lenis) return;
      if (open) this.lenis.stop();
      else this.lenis.start();
    });
  }

  ngOnInit() {
    this.metricsService.trackVisit();
    this.lenis = new Lenis({
      autoRaf: true,
    });

    // Intercepta os cliques nos links com # (âncoras) para usar o scroll suave do Lenis
    this.clickListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        this.lenis?.scrollTo(anchor.hash, { offset: -80 });
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
