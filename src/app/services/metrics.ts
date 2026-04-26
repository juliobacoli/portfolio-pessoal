import { Injectable, inject } from '@angular/core';
import { Firestore, doc, updateDoc, increment, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private readonly firestore = inject(Firestore);
  private readonly STORAGE_KEY = 'last_visit_date';
  private readonly METRICS_PATH = 'metricas/geral';

  async trackVisit(): Promise<void> {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(this.STORAGE_KEY);

    if (lastVisit !== today) {
      try {
        await this.incrementCounter();
        localStorage.setItem(this.STORAGE_KEY, today);
      } catch (error) {
        console.error('Erro ao contabilizar visita:', error);
      }
    }
  }

  private async incrementCounter(): Promise<void> {
    const docRef = doc(this.firestore, this.METRICS_PATH);
    
    try {
      // Tenta incrementar (assume que o documento existe)
      await updateDoc(docRef, {
        contador_visitas: increment(1)
      });
    } catch (error: any) {
      // Se o documento não existir (erro 404/not-found), cria ele
      if (error.code === 'not-found') {
        await setDoc(docRef, { contador_visitas: 1 });
      } else {
        throw error;
      }
    }
  }
}
