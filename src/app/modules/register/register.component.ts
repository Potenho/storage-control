import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavMenuComponent } from '../../design-system/nav-menu/nav-menu.component';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
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
      this.register();
    }
    this.hasClickedSubmit = true;
  }

  private register() {
    this.backendService.register(this.form.value).then(() => {
      this.callLogin();
    }).catch((e) => this.loginError = true);
  }


  private callLogin() {
    this.backendService.login(this.form.value).then(() => {
      this.routerService.navigate(['/home']);
    }).catch((e) => this.loginError = true)
  }
}
