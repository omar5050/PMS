import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)

  if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') == 'Manager') {
    console.log('Guard T');

    return true;
  } else {
    console.log('Guard F');

    _Router.navigate(['/core/login']);
    return false;
  }
};
