import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-projects-grid',
  imports: [ProjectCard],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.scss',
})
export class ProjectsGrid {
  protected projectsService = inject(ProjectsService);
}
