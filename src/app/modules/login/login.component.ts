import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  backendService = inject(BackendService);
  routerService = inject(Router);

  loginError = false;
  hasClickedSubmit = false;
  

  onSubmit() {
    this.loginError = false;
    if (this.form.valid) {
      this.getLogin();
    }
    this.hasClickedSubmit = true;
  }

  private getLogin() {
    this.backendService.login(this.form.value).then(()  => {
      this.routerService.navigate(['/home'])
    })
    .catch((e) => this.loginError = true);
  }
}
