import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {catchError, map,  Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { AppUser } from '../api/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private currentUserRole?: string;
    private userRole?: string;
    private jwtHelper = new JwtHelperService();


    private urlServiceApi="http://localhost:8083/";
    private tokenKey = 'access_token'; // Clé utilisée pour stocker le token dans le localStorage

    res!:Token;


  constructor(private Http:HttpClient) {

   }
   register(RegisterRequest:any):Observable<any>{
    return this.Http.post(this.urlServiceApi+"register",RegisterRequest)
   }
   login(AuthenticationRequest:any):Observable<any>{
    return this.Http.post(this.urlServiceApi+"authenticate",AuthenticationRequest)
   }
   hasRole(role: string): boolean {
    return this.currentUserRole === role;
  }
  /* getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }*/
  setUserRole(role: string): void {
    localStorage.setItem('role', role);
    console.log('Role set in localStorage:', role);
}

/*getUserRole(): string | null {
    const storedToken = localStorage.getItem('jwt');
    console.log(storedToken,'token')
    if (storedToken) {
        try {
            const decodedToken: any = jwtDecode(storedToken);
            const userRole = decodedToken?.role || null;
            console.log('Decoded token:', decodedToken);
            console.log('User role:', userRole);
            return userRole;
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return null;
        }
    } else {
        console.warn('No token found in localStorage');
        return null;
    }
}*/
getUserRole(): string | undefined {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
        try {
            const decodedToken = jwtDecode<any>(storedToken); // Ensure proper typing
            return decodedToken.role || undefined;  // Return undefined instead of null
        } catch (error) {
            console.error('Error decoding token:', error);
            return undefined;  // Return undefined on error
        }
    }
    return undefined;
}

  getAllUsers(): Observable<AppUser[]> {
    return this.Http.get<AppUser[]>(`${this.urlServiceApi}get-all-users`);
  }


  authenticate(credentials: { email: string, motdepasse: string }): Observable<any> {
    return this.Http.post(`${this.urlServiceApi}authenticate`, credentials).pipe(
      map(response => {
        if(response){
          return response
        }
        else{
          return null;
        }
      })
    );
  }

  logoutUser(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
  getCurrentUserId(): number | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  get Token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  isTokenExpired(): boolean {
    const decodedToken = this.decodeToken();
    if (!decodedToken) return true;
    const now = Date.now() / 1000; // Temps actuel en secondes
    return decodedToken.exp < now;
  }
  getCurrentUser(): any {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('No token found');
    }
    const decodedToken: any = jwtDecode(token); // Use jwtDecode here
    return decodedToken;
  }
  fetchUserIdByEmail(email: string): Observable<number> {
    return this.Http.get<number>(`${this.urlServiceApi}api/users/fetch-id?email=${encodeURIComponent(email)}`);
  }

  fetchUserByEmail(email: string): Observable<AppUser> {
    return this.Http.get<AppUser>(`${this.urlServiceApi}search/by-email?email=${encodeURIComponent(email)}`);
  }
}


