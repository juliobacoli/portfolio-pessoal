import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  nome: string;
  email: string;
  tipo?: string;
  mensagem: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore = inject(Firestore);

  async send(payload: ContactPayload): Promise<void> {
    const colecao = collection(this.firestore, 'contatos_recebidos');
    await addDoc(colecao, {
      ...payload,
      criadoEm: serverTimestamp(),
      userAgent: navigator.userAgent,
    });

    await this.sendEmail(payload);
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
