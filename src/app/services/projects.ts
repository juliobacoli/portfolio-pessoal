import { Injectable } from '@angular/core';

export interface Project {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  readonly projects: Project[] = [
    {
      name: 'Feriados BR',
      description: 'Consulta de feriados nacionais e estaduais do Brasil.',
      url: 'https://www.feriadosbr.online/',
      imageUrl: 'https://placehold.co/600x600/1a2a2a/E6E7D6?text=Feriados+BR',
    },
    {
      name: 'AH2 Carreiras',
      description: 'Portal de vagas e oportunidades para uma empresa de refrigeração.',
      url: 'https://www.ah2carreiras.com.br/',
      imageUrl: 'https://placehold.co/600x600/1a1a2a/E6E7D6?text=AH2+Carreiras',
    },
    {
      name: 'Ribeiro Estética',
      description: 'Site de serviços para estética automotiva.',
      url: 'https://www.ribeiroestetica.com.br/',
      imageUrl: 'https://placehold.co/600x600/2a1a2a/E6E7D6?text=Ribeiro+Estetica',
    },
    {
      name: 'IC Pedra Angular',
      description: 'Site institucional para uma igreja cristã em São Paulo.',
      url: 'https://www.icpedraangular.com.br/',
      imageUrl: 'https://placehold.co/1400x600/2a2a3a/E6E7D6?text=IC+Pedra+Angular',
      featured: true,
    },
  ];

  get count(): number {
    return this.projects.length;
  }
}
