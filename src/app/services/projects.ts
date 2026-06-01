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
      name: 'projects.feriados_br.name',
      description: 'projects.feriados_br.description',
      url: 'https://www.feriadosbr.online/',
      imageUrl: 'https://placehold.co/600x600/1a2a2a/E6E7D6?text=Feriados+BR',
      videoUrl: '/feriado-video.mp4',
    },
    {
      name: 'projects.ah2_carreiras.name',
      description: 'projects.ah2_carreiras.description',
      url: 'https://www.ah2carreiras.com.br/',
      imageUrl: '/tecnico-em-refrigeracao.png',
    },
    {
      name: 'projects.ribeiro_estetica.name',
      description: 'projects.ribeiro_estetica.description',
      url: 'https://www.ribeiroestetica.com.br/',
      imageUrl: '/estetica.png',
    },
    {
      name: 'projects.ic_pedra_angular.name',
      description: 'projects.ic_pedra_angular.description',
      url: 'https://www.icpedraangular.com.br/',
      imageUrl: '/igreja-portfolio.jpg',
      featured: true,
    },
  ];

  get count(): number {
    return this.projects.length;
  }
}
