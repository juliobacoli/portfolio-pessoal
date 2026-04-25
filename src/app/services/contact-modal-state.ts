import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContactModalState {
  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  private lastTrigger: HTMLElement | null = null;

  open(trigger?: HTMLElement | null) {
    this.lastTrigger = trigger ?? null;
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
    queueMicrotask(() => this.lastTrigger?.focus());
  }
}
