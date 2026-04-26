import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
  effect,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactModalState } from '../../services/contact-modal-state';
import { ContactService } from '../../services/contact';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModal {
  protected readonly state = inject(ContactModalState);
  private readonly contactService = inject(ContactService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly submitState = signal<SubmitState>('idle');
  protected readonly errorMsg = signal<string>('');
  protected readonly submitAttempted = signal(false);
  protected readonly shake = signal(false);
  protected readonly showDiscardConfirm = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    tipo: [''],
    mensagem: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    website: [''],
  });

  private readonly dialogRef = viewChild<ElementRef<HTMLDivElement>>('dialog');
  private readonly confirmDefaultBtnRef = viewChild<ElementRef<HTMLButtonElement>>('confirmDefaultBtn');

  constructor() {
    effect(() => {
      const open = this.state.isOpen();
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        this.resetIfClosed();
      }
    });
  }

  private resetIfClosed() {
    setTimeout(() => {
      this.form.reset();
      this.submitState.set('idle');
      this.errorMsg.set('');
      this.submitAttempted.set(false);
      this.shake.set(false);
      this.showDiscardConfirm.set(false);
    }, 300);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (!this.state.isOpen() || this.submitState() === 'sending') return;
    if (this.showDiscardConfirm()) {
      this.cancelDiscard();
      return;
    }
    this.attemptClose();
  }

  @HostListener('document:keydown', ['$event'])
  trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (!this.state.isOpen()) return;
    const dialog = this.dialogRef()?.nativeElement;
    if (!dialog) return;

    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  onBackdropClick() {
    if (this.submitState() === 'sending') return;
    this.attemptClose();
  }

  closeBtn() {
    if (this.submitState() === 'sending') return;
    this.attemptClose();
  }

  private attemptClose() {
    if (this.isFormDirty() && this.submitState() === 'idle') {
      this.showDiscardConfirm.set(true);
      queueMicrotask(() => this.confirmDefaultBtnRef()?.nativeElement.focus());
      return;
    }
    this.state.close();
  }

  confirmDiscard() {
    this.showDiscardConfirm.set(false);
    this.state.close();
  }

  cancelDiscard() {
    this.showDiscardConfirm.set(false);
  }

  private isFormDirty(): boolean {
    const v = this.form.getRawValue();
    return Boolean(v.nome || v.email || v.tipo || v.mensagem);
  }

  async onSubmit() {
    if (this.form.invalid || this.submitState() === 'sending') {
      this.form.markAllAsTouched();
      this.submitAttempted.set(true);
      this.shake.set(true);
      this.cdr.markForCheck();
      setTimeout(() => this.shake.set(false), 450);
      return;
    }

    const raw = this.form.getRawValue();

    if (raw.website.trim()) {
      this.submitState.set('success');
      return;
    }

    this.submitState.set('sending');
    this.errorMsg.set('');

    try {
      await this.contactService.send({
        nome: raw.nome.trim(),
        email: raw.email.trim(),
        tipo: raw.tipo || undefined,
        mensagem: raw.mensagem.trim(),
      });
      this.submitState.set('success');
    } catch (err) {
      console.error('Erro ao enviar contato:', err);
      this.submitState.set('error');
      this.errorMsg.set('Falha no envio. Tenta novamente.');
    }
  }

  retry() {
    this.submitState.set('idle');
    this.errorMsg.set('');
  }

  fieldInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && (c.touched || c.dirty || this.submitAttempted()));
  }

  onFieldFocus(event: FocusEvent) {
    const el = event.target as HTMLElement;
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }

  fieldError(name: string): string {
    const c = this.form.get(name);
    if (!c || !c.errors) return '';
    if (c.errors['required']) return 'Campo obrigatório.';
    if (c.errors['email']) return 'E-mail inválido.';
    if (c.errors['minlength']) return `Mínimo ${c.errors['minlength'].requiredLength} caracteres.`;
    if (c.errors['maxlength']) return `Máximo ${c.errors['maxlength'].requiredLength} caracteres.`;
    return 'Inválido.';
  }
}
