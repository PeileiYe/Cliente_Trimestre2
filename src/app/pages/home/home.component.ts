import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../services/series.service';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  series: Serie[] = [];

  constructor(private seriesService: SeriesService) {
    this.loadSeries();   
  }

  private loadSeries(): void {
    this.seriesService.getAll().subscribe({
      next: (data) => this.series = data,
      error: () => this.series = []
    });
  }
}
