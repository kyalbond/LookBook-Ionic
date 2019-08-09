import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  currentImage: any;

  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private camera: Camera,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  takePhoto() {


    this.camera.getPicture(this.options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      console.log(this.currentImage);
    }, (err) => {
      console.log(err);
    });
  }

}
