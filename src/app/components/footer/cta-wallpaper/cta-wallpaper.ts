import { Component, HostListener, inject } from '@angular/core';
import { ContactModalState } from '../../../services/contact-modal-state';
import { TranslateModule } from '@ngx-translate/core';

const MOBILE_BREAKPOINT = 768;
const MOBILE_OVALS = 1;
const DESKTOP_OVALS = 16;
// Negativo = move na direção oposta ao mouse; o valor controla a distância
const DODGE_FACTOR = -0.4;

@Component({
  selector: 'app-cta-wallpaper',
  imports: [TranslateModule],
  templateUrl: './cta-wallpaper.html',
  styleUrl: './cta-wallpaper.scss',
})
export class CtaWallpaper {
  ovals: number[] = this.buildOvals();
  private modalState = inject(ContactModalState);

  openContact(event: MouseEvent) {
    this.modalState.open(event.currentTarget as HTMLElement);
  }

  @HostListener('window:resize')
  onResize(): void {
    // Só recria os botões quando cruza o breakpoint (mobile <-> desktop)
    const next = this.buildOvals();
    if (next.length !== this.ovals.length) {
      this.ovals = next;
    }
  }

  dodge(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const moveX = (event.clientX - rect.left - rect.width / 2) * DODGE_FACTOR;
    const moveY = (event.clientY - rect.top - rect.height / 2) * DODGE_FACTOR;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }

  resetPosition(event: MouseEvent) {
    (event.currentTarget as HTMLElement).style.transform = 'translate(0px, 0px)';
  }

  private buildOvals(): number[] {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    return Array(isMobile ? MOBILE_OVALS : DESKTOP_OVALS).fill(0);
  }
}
