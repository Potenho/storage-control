import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
  backendService = inject(BackendService);

  logout() {
    this.backendService.logout();
  }
}
