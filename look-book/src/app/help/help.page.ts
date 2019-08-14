import { Component, OnInit } from '@angular/core';

/**
 * Class for displaying helpfull information to the user about the app
 */
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  // Different information to display to the user
  public title = 'Open-Book!';
  public subtitle = 'This application was created so you can upload photos of your outfits and share it with the world to inspire others.';
  public featuresTitle = 'This application has the following features:';
  public features = [
    'Account Authentication',
    'Camera Capture (Available only on mobile)',
    'Image upload',
    'Like Photos (by tapping)',
    'View photos by date (latest)',
    'View photos by popularity (Top Picks)',
    'Change account details',
    'Delete Account'
  ];

  constructor() { }

  ngOnInit() { }

}
