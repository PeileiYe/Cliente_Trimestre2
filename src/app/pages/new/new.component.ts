import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SeriesService } from '../../services/series.service';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
})
export class NewComponent {

  mensaje: string = '';

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    channel: new FormControl('', [
      Validators.required
    ]),
    rating: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ]),
  });

  constructor(
    private seriesService: SeriesService,
    private router: Router
  ) {}

  enviar(): void {
    if (this.form.invalid) return;

    const payload: Omit<Serie, 'id'> = {
      title: this.form.value.title as string,
      channel: this.form.value.channel as string,
      rating: Number(this.form.value.rating),
    };

    this.seriesService.create(payload).subscribe({
      next: (res) => {
        this.mensaje = `Serie creada correctamente. ID: ${res.id}`;

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 6000);
      },
      error: () => {
        this.mensaje = 'Error al crear la serie';
      },
    });
  }
}
