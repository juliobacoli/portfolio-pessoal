import { Component, HostListener, input, signal, inject } from '@angular/core';
import { NavBrand } from '../nav-brand/nav-brand';
import { NavMenu } from '../nav-menu/nav-menu';
import { TranslateModule } from '@ngx-translate/core';
import { Lang, LanguageService } from '../../../services/language';
import { ScrollLock } from '../../../services/scroll-lock';

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
  private language = inject(LanguageService);
  private scrollLock = inject(ScrollLock);
  currentLang = this.language.current;

  switchLang(lang: Lang) {
    this.language.use(lang);
  }

  toggleBs() {
    this.setBs(!this.isBsOpen());
  }

  closeBs() {
    this.setBs(false);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.isBsOpen()) this.closeBs();
  }

  private setBs(open: boolean) {
    this.isBsOpen.set(open);
    this.scrollLock.set('header-menu', open);
  }
}
