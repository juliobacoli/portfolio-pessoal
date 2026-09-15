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
      imageUrl: '/feriado-poster.webp',
      videoUrl: '/feriado-video.mp4',
    },
    {
      name: 'projects.ah2_carreiras.name',
      description: 'projects.ah2_carreiras.description',
      url: 'https://www.ah2carreiras.com.br/',
      imageUrl: '/tecnico-em-refrigeracao.webp',
    },
    {
      name: 'projects.ribeiro_estetica.name',
      description: 'projects.ribeiro_estetica.description',
      url: 'https://www.ribeiroestetica.com.br/',
      imageUrl: '/estetica.webp',
    },
    {
      name: 'projects.ic_pedra_angular.name',
      description: 'projects.ic_pedra_angular.description',
      url: 'https://www.icpedraangular.com.br/',
      imageUrl: '/igreja-portfolio.webp',
      featured: true,
    },
  ];

  get count(): number {
    return this.projects.length;
  }
}
