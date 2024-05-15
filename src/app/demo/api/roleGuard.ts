import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class RoleGuard implements CanActivate {
      constructor(private authService: UserService, private router: Router) {}

      canActivate(route: ActivatedRouteSnapshot): boolean {
          const requiredRole = route.data['requiredRole'];
          if (this.authService.hasRole(requiredRole)) {
              return true;
          } else {
              this.router.navigate(['/unauthorized']); // Redirigez vers une page appropriée
              return false;
          }
      }
  }
