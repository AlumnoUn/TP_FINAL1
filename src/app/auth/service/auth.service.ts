import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, BehaviorSubject, tap, switchMap } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';
import { Juegos } from '../../shared/interfaces/juego.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users'

  private activeUserSubject = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) { }

  auth() {
    return this.activeUserSubject.asObservable();
  }

  signup(user: User) {
    
    ///Verificacion por si ya existe en la bdd
    return this.http.get<User[]>(`${this.baseUrl}?username=${user.username}`).pipe(
      map(users => {
        if (users.length > 0) {
          window.alert('El usuario ya existe!');
          return false;
        } else {
          return user;
        }
      }),
      switchMap(userToSave => {
        //Esto guarda el user que no existe en la bdd
        if (userToSave) {
          return this.http.post<User>(this.baseUrl, userToSave).pipe(
            map((newUser) => {
              this.activeUserSubject.next(newUser);
              window.alert('Te has registrado satisfactoriamente!');
              return true;  
            })
          );
        } else {

          return of(false);
        }
      }),
      catchError(() => of(false))  
    );
  }

  login(user: User) {
    return this.http.get<User[]>(`${this.baseUrl}?username=${user.username}`).pipe(
      map(([u]) => {
        if (u && u.password === user.password) {
          this.activeUserSubject.next(u);
          return true
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    this.activeUserSubject.next(undefined);
    return of(true);
  }

  getCurrentUser() {
    return this.activeUserSubject.value;
    
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

}
