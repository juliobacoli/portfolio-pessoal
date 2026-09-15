import { Component, input } from '@angular/core';
import { Project } from '../../services/projects';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  imports: [TranslateModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    '[style.grid-column]': 'project().featured ? "1 / -1" : "span 1"',
  },
})
export class ProjectCard {
  project = input.required<Project>();
  // Com "reduzir movimento" ativo, o vídeo fica parado no poster
  protected readonly autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
