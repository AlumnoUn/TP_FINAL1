import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, BehaviorSubject, tap } from 'rxjs';
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
    return this.http.post<User>(this.baseUrl, user).pipe(
      map((u) => {
        this.activeUserSubject.next(u);
        return true;
      })
    )
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
