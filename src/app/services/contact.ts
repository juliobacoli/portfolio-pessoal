import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  nome: string;
  email: string;
  tipo?: string;
  mensagem: string;
}

const REQUEST_TIMEOUT_MS = 15000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout: ${label}`)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore = inject(Firestore);

  async send(payload: ContactPayload): Promise<void> {
    const colecao = collection(this.firestore, 'contatos_recebidos');
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== undefined)
    );
    await withTimeout(
      addDoc(colecao, {
        ...cleanPayload,
        criadoEm: serverTimestamp(),
        userAgent: navigator.userAgent,
      }),
      REQUEST_TIMEOUT_MS,
      'gravar contato no Firestore'
    );

    await withTimeout(this.sendEmail(payload), REQUEST_TIMEOUT_MS, 'enviar email');
  }

  private async sendEmail(payload: ContactPayload): Promise<void> {
    const cfg = environment.emailjs;
    if (!cfg?.serviceId || !cfg?.templateId || !cfg?.publicKey) {
      console.warn('EmailJS não configurado. Pulando envio de email.');
      return;
    }

    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(
      cfg.serviceId,
      cfg.templateId,
      {
        from_name: payload.nome,
        reply_to: payload.email,
        tipo: payload.tipo || 'Não informado',
        message: payload.mensagem,
      },
      { publicKey: cfg.publicKey }
    );
  }
}
