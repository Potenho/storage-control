import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpClient = inject(HttpClient);

  login(credentials: any) {
    return this.httpClient.post(environment.API + "/login", credentials)
  }

}
