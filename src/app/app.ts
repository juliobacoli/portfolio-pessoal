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

    this.setupConsoleEasterEgg();

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

  private setupConsoleEasterEgg() {
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    const hex = (n: number) => n.toString(16).padStart(2, '0');
    const grad = (t: number) =>
      `#${hex(lerp(0x43, 0xFF, t))}${hex(lerp(0xBC, 0xE6, t))}${hex(lerp(0xC0, 0x00, t))}`;

    const art = [
      '██╗   ██╗ ██████╗ ██╗   ██╗    ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ',
      '╚██╗ ██╔╝██╔═══██╗██║   ██║    ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗',
      ' ╚████╔╝ ██║   ██║██║   ██║    █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║',
      '  ╚██╔╝  ██║   ██║██║   ██║    ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║',
      '   ██║   ╚██████╔╝╚██████╔╝    ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝',
      '   ╚═╝    ╚═════╝  ╚═════╝     ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ',
      '',
      '                    ███╗   ███╗███████╗                                      ',
      '                    ████╗ ████║██╔════╝                                      ',
      '                    ██╔████╔██║█████╗                                        ',
      '                    ██║╚██╔╝██║██╔══╝                                        ',
      '                    ██║ ╚═╝ ██║███████╗                                      ',
      '                    ╚═╝     ╚═╝╚══════╝                                      ',
    ];

    const total = art.filter(l => l.trim()).length;
    let colorIndex = 0;
    art.forEach(line => {
      const t = line.trim() ? colorIndex++ / (total - 1) : 0;
      const style = `color:${line.trim() ? grad(t) : 'transparent'};font-family:monospace;font-weight:bold;font-size:10px;line-height:1.3;`;
      console.log(`%c${line}`, style);
    });

    console.log('%cJulio Bacoli — Sr Developer', 'color:#E6E7D6;font-size:13px;font-weight:bold;margin-top:8px;');
    console.log('%cAngular · TypeScript · UI/UX\n', 'color:#888;font-size:11px;');
    console.log('%cPsst. Tente %chire()%c no console. 👀', 'color:#888;font-size:11px;', 'color:#FFE600;font-size:11px;font-weight:bold;', 'color:#888;font-size:11px;');

    (window as any)['hire'] = () => {
      console.log('%c\n  Boa escolha. 🤝\n', 'color:#00FFFF;font-size:18px;font-weight:bold;');
      console.log('%c  juliosantanabacoli@gmail.com', 'color:#00FFFF;font-size:12px;');
      console.log('%c  Manda um email com o assunto "hire()" — vou saber que você veio daqui.\n', 'color:#00FFFF;font-size:11px;font-style:italic;');
    };
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
