import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Class for login page that utilises angular firebase ui for login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
  }

  /**
   * Login function for html to call after login through firebase
   */
  login() {
    this.router.navigate(['/menu']);
  }

}
