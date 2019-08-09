import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent} from '@angular/router';

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
      url: '/menu/settings'
    }
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });

    router.navigate(['menu/home']);
   }

  ngOnInit() {
  }

}
