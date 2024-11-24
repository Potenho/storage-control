import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { NavMenuComponent } from '../../design-system/nav-menu/nav-menu.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavMenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    usuario: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  });
  loginService = inject(LoginService);

  hasClickedSubmit = false;
  

  onSubmit() {
    if (this.form.valid) {
      this.getLogin();
    }

    this.hasClickedSubmit = true;
  }

  private getLogin() {
    this.loginService.login(this.form.value).subscribe(data => console.log(data));
  }
}
