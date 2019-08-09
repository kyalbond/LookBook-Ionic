import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private username;
  private password;

  constructor(
    private alertController: AlertController,
    private router: Router,
    ) { }

  ngOnInit() {
  }


  checkLogin() {
    this.username = (document.getElementById('username') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;

    if (this.username.length <= 0 || this.password.length <= 0) {
      this.createAlert('Login Failed', 'Please enter a username AND password.');
    } else if (this.username === 'admin' && this.password === 'admin') {
      // TODO: IMPLEMENT USER AUTHENTICATION
      this.createAlert('Welcome back ' + this.username + '!', '');
      this.router.navigate(['/home']);
    } else {
      this.createAlert('Login Failed', 'No user was found with these details.');
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
