import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
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
  ) { }

  ngOnInit() {
  }

  checkDetails() {
    this.firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    this.lastName = (document.getElementById('lastName') as HTMLInputElement).value;

    if (this.firstName.length <= 0 || this.lastName.length <= 0) {
      this.createAlert('Enter Details!', 'Please enter your first name, last name, and current password!');
    } else {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.firstName + ' ' + this.lastName
      });
      this.createAlert('Details Updated', 'Your username has been updated!');
    }
  }

  async createAlert(alrtHeader, alrtMessage) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: ['Confirm']
    });

    await alert.present();
  }
}
