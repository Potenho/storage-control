import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from '../../design-system/nav-menu/nav-menu.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
