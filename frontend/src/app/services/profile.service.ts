import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, of, switchMap, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private authUser$ = user(this.auth);

  /** Observable профиля из users/{uid} */
  profile$(): Observable<any | null> {
    return this.authUser$.pipe(
      switchMap(authUser => {
        if (!authUser) return of(null);
        const ref = doc(this.firestore, `users/${authUser.uid}`);
        return from(getDoc(ref)).pipe(
          map(snap => (snap.exists() ? { uid: snap.id, ...snap.data() } : null))
        );
      })
    );
  }

  /** Загрузка аватара как base64 в users/{uid} */
  uploadAvatarBase64(file: Blob | File, uid: string): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          let base64 = reader.result as string;
          base64 = base64.replace(/\r?\n|\r/g, '');
          await setDoc(doc(this.firestore, `users/${uid}`), { avatarBase64: base64 }, { merge: true });
          resolve(base64);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = e => reject(e);
      reader.readAsDataURL(file);
    });
  }

  /** Удаление аватара */
  removeAvatar(uid: string): Promise<void> {
    return setDoc(doc(this.firestore, `users/${uid}`), { avatarBase64: null }, { merge: true });
  }

  /** Одноразовое получение текущего пользователя Auth */
  async getCurrentUser(): Promise<any | null> {
    return new Promise(resolve => {
      const sub = this.authUser$.subscribe(u => {
        resolve(u);
        sub.unsubscribe();
      });
    });
  }
}

