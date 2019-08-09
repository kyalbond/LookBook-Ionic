import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  login() {
      this.router.navigate(['/menu']);
  }

}
