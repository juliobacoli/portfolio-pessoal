import { Injectable } from '@angular/core';

export interface Project {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  videoUrl?: string;
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
      videoUrl: '/feriado-video.mp4',
    },
    {
      name: 'AH2 Carreiras',
      description: 'Portal de vagas e oportunidades.',
      url: 'https://www.ah2carreiras.com.br/',
      imageUrl: '/tecnico-em-refrigeracao.png',
    },
    {
      name: 'Ribeiro Estética',
      description: 'Site de serviços para estética automotiva.',
      url: 'https://www.ribeiroestetica.com.br/',
      imageUrl: '/estetica.png',
    },
    {
      name: 'IC Pedra Angular',
      description: 'Site institucional para uma igreja cristã em Taboão da Serra.',
      url: 'https://www.icpedraangular.com.br/',
      imageUrl: '/igreja-portfolio.jpg',
      featured: true,
    },
  ];

  get count(): number {
    return this.projects.length;
  }
}
