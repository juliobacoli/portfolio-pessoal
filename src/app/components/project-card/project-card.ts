import { Component, input } from '@angular/core';
import { Project } from '../../services/projects';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    '[style.grid-column]': 'project().featured ? "1 / -1" : "span 1"',
  },
})
export class ProjectCard {
  project = input.required<Project>();
}
