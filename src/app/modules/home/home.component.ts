import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMenuComponent } from '../../design-system/nav-menu/nav-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
