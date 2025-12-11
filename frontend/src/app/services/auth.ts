import { inject, Injectable } from '@angular/core';

import { Auth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         authState,
         updateProfile
       } from '@angular/fire/auth';

import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  
  currentUser$ = authState(this.auth);

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
    );
  }

  /**
   * Upload profile picture and update user profile
   */
  uploadProfilePicture(file: File): Promise<string> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const fileRef = ref(this.storage, `profile-pictures/${user.uid}/${Date.now()}_${file.name}`);
    
    return uploadBytes(fileRef, file).then(() => {
      return getDownloadURL(fileRef).then(url => {
        // Update Firebase Auth profile
        return updateProfile(user, { photoURL: url }).then(() => {
          // Also save to Firestore for easy access
          const userDoc = doc(this.firestore, `users/${user.uid}`);
          return setDoc(userDoc, { photoURL: url }, { merge: true }).then(() => url);
        });
      });
    });
  }

  /**
   * Get user profile data from Firestore
   */
  getUserProfile(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDoc)).pipe(
      switchMap(docSnap => {
        if (docSnap.exists()) {
          return of(docSnap.data());
        }
        return of(null);
      })
    );
  }

  /**
   * Delete profile picture
   */
  deleteProfilePicture(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user || !user.photoURL) {
      return Promise.resolve();
    }

    // Delete from storage
    const fileRef = ref(this.storage, user.photoURL);
    return deleteObject(fileRef)
      .catch(() => {
        // Ignore if file doesn't exist
      })
      .then(() => {
        // Update Firebase Auth profile
        return updateProfile(user, { photoURL: null });
      })
      .then(() => {
        // Update Firestore
        const userDoc = doc(this.firestore, `users/${user.uid}`);
        return setDoc(userDoc, { photoURL: null }, { merge: true });
      });
  }
}
