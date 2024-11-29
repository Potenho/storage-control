import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  backendService = inject(BackendService);
  name = localStorage.getItem('name');
}
