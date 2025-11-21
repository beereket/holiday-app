import { inject, Injectable } from '@angular/core';

import { Auth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         authState 
       } from '@angular/fire/auth';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)
  currentUser$ = authState(this.auth)

  signUp(email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
        .catch(err => { throw err; })
    )
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.auth, email, password)
        .catch(err => { throw err; })
    )
  }

  logout() {
    return from(
      signOut(this.auth)
    )
  }
}
