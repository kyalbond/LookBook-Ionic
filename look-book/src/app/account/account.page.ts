import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

/**
 * Class for modifying user account information
 */
@Component({
  selector: 'app-settings',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private firstName;
  private lastName;

/**
 * Contsructor for setting up appropriate objects
 *
 * @param alertController       // Alert controller to create confirmation alerts when modifying user data
 * @param router                // Router for navigating back to login screen when necessary
 * @param toastCtrl             // Toast controller to notify user when backend operations occcur
 * @param afAuth                // Firebase authorization object for getting user data
 */
  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() { }

  /**
   * Checks input fields for username change and makes changed if necessary
   */
  checkDetails() {
    this.firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    this.lastName = (document.getElementById('lastName') as HTMLInputElement).value;

    // Check if user has input information in both firstname and last fields
    if (this.firstName.length <= 0 || this.lastName.length <= 0) {
      this.createAlert('Enter Details!', 'Please enter your first name, last name, and current password!');
    } else {
    // User has input information, now confirm with user to modify information
      this.createConfirmAlert('Warning', 'Are you sure you want to update your username to the above details?', 1);
    }
  }

  /**
   * Update username for user
   */
  updateUsername() {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: this.firstName + ' ' + this.lastName
    });
    this.showToast('Username has been updated!');
  }

  /**
   * Delete user account
   */
  confirmDelete() {
    this.afAuth.auth.currentUser.delete().catch(() => {
      this.createAlert('Sign-In', 'Please sign back in to use this feature');
    });
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  /**
   * Confirm account deletion with user using alert
   */
  deleteAccount() {
    this.createConfirmAlert('Warning!', 'Are you sure you want to delete your account?', -1);
    this.showToast('Account has been deleted!');
  }

  /**
   * Create alert with given header and message
   *
   * @param alrtHeader          // Header for alert
   * @param alrtMessage         // Message for alert
   */
  async createAlert(alrtHeader, alrtMessage) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: ['Confirm']
    });

    await alert.present();
  }

  /**
   * Create confirm/cancel alert which handles multiple scenarios
   *
   * @param alrtHeader          // Header for alert
   * @param alrtMessage         // Message for alert
   * @param type                // Reason for alert. 1 = update username, -1 = delete user
   */
  async createConfirmAlert(alrtHeader, alrtMessage, type) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            if (type === 1) {
              this.updateUsername();
            } else if (type === -1) {
              this.confirmDelete();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * General toast function which displays passed message
   *
   * @param msg         // Display image passed in by user
   */
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
