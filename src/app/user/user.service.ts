import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser, UserCredentials } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<IUser | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null>(null);
  }

  getUser(): Observable<IUser | null> {
    return this.user;
  }

  signIn(credentials: UserCredentials): Observable<IUser> {
    return this.http.post<IUser>('/api/sign-in', credentials).pipe(
      map((user: IUser) => {
        this.user.next(user);
        return user;
      })
    );
  }
  signOut() {
    this.user.next(null);
  }
}
