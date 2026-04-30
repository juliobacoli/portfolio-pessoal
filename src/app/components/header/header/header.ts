import { Component, input, signal } from '@angular/core';
import { NavBrand } from '../nav-brand/nav-brand';
import { NavMenu } from '../nav-menu/nav-menu';

@Component({
  selector: 'app-header',
  imports: [NavBrand, NavMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  brandName = input<string>('');
  projectCount = input<number>(0);

  isBsOpen = signal(false);

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
