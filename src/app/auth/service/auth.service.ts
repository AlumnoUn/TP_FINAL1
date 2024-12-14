import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, BehaviorSubject, tap, switchMap } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/users'

  private activeUserSubject = new BehaviorSubject<User | undefined>(undefined);
  activeUser$ = this.activeUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('activeUser');
    if(storedUser){
      this.activeUserSubject.next(JSON.parse(storedUser));
    } else {
      this.activeUserSubject.next(undefined);
    }
    window.addEventListener('storage', (event) => {
      if (event.key === 'activeUser') {
        const newUser = event.newValue ? JSON.parse(event.newValue) : undefined;
        this.activeUserSubject.next(newUser); // Actualiza el estado del usuario en esta pestaña
      }
    });
  }

  

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
          ///Para mantener la sesion iniciada en otras pestañas
          localStorage.setItem('activeUser', JSON.stringify(u));

          this.activeUserSubject.next(u);
          return true
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('activeUser'); // Quita la sesion en general
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
