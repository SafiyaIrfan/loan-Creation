import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const authFackservice = inject(AuthfakeauthenticationService)
  // const storageService = inject(sessionStorage)
  // if ((sessionStorage.getItem("loggedIn")) === "true") {
  //   return true;
  // }

  if ((sessionStorage.getItem("loggedIn")) === "true") {
      // logged in so return true
      return true;
  }
  else {
    Swal.fire({
      text: 'You don’t have permission to view this page',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: "#4747a1",
      // cancelButtonColor: "#d33",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    }).then((_result: any) => {
    });
  }
  // not logged in so redirect to login page with the return url
  router.navigate(['/']);
  return false;

};
