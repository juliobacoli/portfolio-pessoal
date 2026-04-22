import { Component, input } from '@angular/core';
import { Project } from '../../services/projects';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    '[style.grid-column]': '"span " + project().cols',
  },
})
export class ProjectCard {
  project = input.required<Project>();
}
