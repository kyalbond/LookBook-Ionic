import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

/**
 * Class for handling side-menu navigation and logout functionality
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';              // Initial side-menu route path

  pages = [                       // List of different side-menu pages
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

  /**
   * Initiates a subscription to track paths tapped on side-menu.
   *
   * @param router                // Router used to navigate application
   * @param afAuth                // Authorization object for retrieving current user information
   * @param alertController       // Create alerts for certain actions
   */
  constructor(
    private router: Router,
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  /**
   * Ensures there is a user logged in and then sends user to appropriate screen
   */
  ngOnInit() {
    if (this.afAuth.auth.currentUser == null) {
      this.router.navigate(['/login']);                     // Go to login screen if there is no user currently logged (failsafe)
    } else {
      this.router.navigate(['/menu/home/tabs/dashboard']);  // Go to dashboard when logged in
    }
  }

  /**
   * Function for html to call when clicking logout
   */
  logout() {
    this.createAlert('Logout?', 'Are you sure you want to log out?');
  }

  /**
   * Create an alert with the passed header and message
   *
   * @param alrtHeader          // Header for alert
   * @param alrtMessage         // Message for alert
   */
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
          handler: () => {      // If user confirms logout, signout and go back to login screen
            this.afAuth.auth.signOut();
            this.router.navigate(['/login']);

          }
        }
      ]
    });
    await alert.present();
  }

}
