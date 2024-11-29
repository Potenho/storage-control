import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendService } from './backend.service';

export const authGuard: CanActivateFn = (route, state) => {
  const backendService = inject(BackendService);
  const routeService = inject(Router);

  if (backendService.loggedIn()) {
    return true;
  } else {
    routeService.navigate(['/login']);
  }
  return false;
};
