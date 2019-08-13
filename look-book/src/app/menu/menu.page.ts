import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Dashboard',
      url: '/menu/home'
    },
    {
      title: 'Account Settings',
      url: '/menu/account'
    },
    {
      title: 'Help',
      url: '/menu/help'
    }
  ];

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private alertController: AlertController,
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    router.navigate(['menu/home']);
   }

  ngOnInit() {
    if (this.afAuth.auth.currentUser == null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.createAlert('Logout?', 'Are you sure you want to log out?');
  }

  async createAlert(alrtHeader, alrtMessage) {
    const alert = await this.alertController.create({
      header: alrtHeader,
      message: alrtMessage,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
              this.router.navigate(['/login']);

          }
        }
      ]
    });

    await alert.present();
  }

}
