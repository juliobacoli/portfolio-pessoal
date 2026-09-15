import { Injectable } from '@angular/core';

// Centraliza o travamento do scroll da página: só destrava quando ninguém mais precisa dele
@Injectable({ providedIn: 'root' })
export class ScrollLock {
  private readonly owners = new Set<string>();

  set(owner: string, locked: boolean) {
    if (locked) this.owners.add(owner);
    else this.owners.delete(owner);

    document.body.style.overflow = this.owners.size ? 'hidden' : '';
  }
}
