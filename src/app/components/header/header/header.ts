import { Component, input, signal, inject } from '@angular/core';
import { NavBrand } from '../nav-brand/nav-brand';
import { NavMenu } from '../nav-menu/nav-menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [NavBrand, NavMenu, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  brandName = input<string>('');
  projectCount = input<number>(0);

  isBsOpen = signal(false);
  private translate = inject(TranslateService);
  currentLang = signal<string>('pt');

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }

  toggleBs() {
    const next = !this.isBsOpen();
    this.isBsOpen.set(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  closeBs() {
    this.isBsOpen.set(false);
    document.body.style.overflow = '';
  }
}
