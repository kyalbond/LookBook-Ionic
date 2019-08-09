import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private username;
  private password;
  private passwordAuth;

  constructor(
    private alertController: AlertController,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  checkDetails() {
    this.username = (document.getElementById('createUser') as HTMLInputElement).value;
    this.password = (document.getElementById('createPass') as HTMLInputElement).value;
    this.passwordAuth = (document.getElementById('passwordAuth') as HTMLInputElement).value;

    console.log('Trying to create: ' + this.username + ', ' + this.password);

    if (this.username.length <= 0 || this.password.length <= 0 || this.passwordAuth <= 0) {
      this.createAlert('Enter Details!', 'Please enter a username AND password.');
    } else if (this.username === 'admin') {
      this.createAlert('Too slow ' + this.username + '!', 'Somebody has already taken that username. Please pick another.');
    } else if (this.password !== this.passwordAuth) {
      this.createAlert('Password missmatch', 'Your passwords do not match, please try again!');
    } else {
      // TODO: IMPLEMENT USER AUTHENTICATION
      this.createAlert('Conrgratulations ' + this.username + '!', 'Your account was created.');
      this.router.navigate(['/login']);
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
