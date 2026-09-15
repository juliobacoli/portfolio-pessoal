import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { App } from './app';
import { MetricsService } from './services/metrics';
import { ContactService } from './services/contact';

describe('App', () => {
  beforeEach(async () => {
    // jsdom não implementa matchMedia; "reduzir movimento" ligado evita iniciar o Lenis
    window.matchMedia = ((query: string) => ({
      matches: true,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideTranslateService(),
        // Serviços que acessam o Firebase ficam de fora do teste
        { provide: MetricsService, useValue: { trackVisit: () => Promise.resolve() } },
        { provide: ContactService, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render brand name and hero title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Julio Bacoli');
    expect(compiled.querySelector('h1')).toBeTruthy();
  });

  it('should persist language choice', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const enButton = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.lang-switcher button'))
      .find((b) => b.textContent?.trim() === 'EN');
    enButton?.click();
    await fixture.whenStable();

    expect(localStorage.getItem('lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(enButton?.getAttribute('aria-pressed')).toBe('true');
  });
});
