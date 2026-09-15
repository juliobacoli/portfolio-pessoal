import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'pt' | 'en';

const STORAGE_KEY = 'lang';
const DEFAULT_LANG: Lang = 'pt';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly _current = signal<Lang>(DEFAULT_LANG);
  readonly current = this._current.asReadonly();

  // Chamado no boot: aplica o idioma salvo (ou o padrão)
  init() {
    return this.apply(this.readSaved());
  }

  use(lang: Lang) {
    this.save(lang);
    return this.apply(lang);
  }

  private apply(lang: Lang) {
    this._current.set(lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    return this.translate.use(lang);
  }

  // localStorage pode lançar exceção (aba anônima, storage bloqueado)
  private readSaved(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'pt' || saved === 'en' ? saved : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  }

  private save(lang: Lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // sem persistência; o idioma vale só nesta visita
    }
  }
}
