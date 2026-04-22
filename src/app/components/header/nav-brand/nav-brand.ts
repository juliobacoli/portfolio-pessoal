import { Component, input } from '@angular/core';

@Component({
  selector: 'app-nav-brand',
  templateUrl: './nav-brand.html',
  styleUrl: './nav-brand.scss',
})
export class NavBrand {
  name = input.required<string>();
}
