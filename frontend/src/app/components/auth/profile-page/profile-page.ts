import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth';
import { ProfileService } from '../../../services/profile.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css'
})
export class ProfilePage {
  private auth = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  user$ = this.auth.currentUser$;
  profile$ = this.profileService.profile$();
  uploading = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Please select an image file', 'Close', { duration: 3000 });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('Image size should be less than 5MB', 'Close', { duration: 3000 });
        return;
      }

      this.selectedFile = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePicture() {
    if (!this.selectedFile) {
      return;
    }

    this.uploading = true;
    this.profileService.getCurrentUser()
      .then(user => {
        if (!user) throw new Error('User not authenticated');
        return this.profileService.uploadAvatarBase64(this.selectedFile!, user.uid);
      })
      .then(() => {
        this.snackBar.open('Profile picture updated successfully!', 'Close', { duration: 3000 });
        this.selectedFile = null;
        this.previewUrl = null;
        this.uploading = false;
      })
      .catch((error) => {
        this.snackBar.open('Failed to upload profile picture: ' + error.message, 'Close', { duration: 5000 });
        this.uploading = false;
      });
  }

  removeProfilePicture() {
    this.uploading = true;
    this.profileService.getCurrentUser()
      .then(user => {
        if (!user) throw new Error('User not authenticated');
        return this.profileService.removeAvatar(user.uid);
      })
      .then(() => {
        this.snackBar.open('Profile picture removed', 'Close', { duration: 3000 });
        this.uploading = false;
      })
      .catch((error) => {
        this.snackBar.open('Failed to remove profile picture: ' + error.message, 'Close', { duration: 5000 });
        this.uploading = false;
      });
  }

  cancelUpload() {
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
