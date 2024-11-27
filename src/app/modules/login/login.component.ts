import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
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
