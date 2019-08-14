import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  private firstName;
  private lastName;
  private newPass;
  private newPassAuth;


  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private router: Router,
    private tpastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  checkDetails() {
    this.firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    this.lastName = (document.getElementById('lastName') as HTMLInputElement).value;

    if (this.firstName.length <= 0 || this.lastName.length <= 0) {
      this.createAlert('Enter Details!', 'Please enter your first name, last name, and current password!');
    } else {
      this.createConfirmAlert('Warning', 'Are you sure you want to update your username to the above details?', 1);
    }
  }

  updateUsername() {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: this.firstName + ' ' + this.lastName
    });
    this.showToast('Username has been updated!');
  }

  deleteAccount() {
    this.createConfirmAlert('Warning!', 'Are you sure you want to delete your account?', -1);
    this.showToast('Account has been deleted!');
  }

  confirmDelete() {
    this.afAuth.auth.currentUser.delete().catch(() => {
      this.createAlert('Sign-In', 'Please sign back in to use this feature');
    });
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  async createAlert(alrtHeader, alrtMessage) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: ['Confirm']
    });

    await alert.present();
  }

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

  showToast(msg) {
    this.tpastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
