import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { Image, DataService } from '../data.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Class for handling the 'Front Page' tab on the dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public images: Observable<Image[]>;     // Image array used to store images from data service

  public image: Image = {                 // Empty image object for when photos are taken
    id: '',
    userId: '',
    name: '',
    imageURL: '',
    date: null,
    likes: 0,
  };

  private options: CameraOptions = {                        // Camera settings for camera plugin
    quality: 20,                                            // Quality = 20 as higher quality photos are to large to store
    destinationType: this.camera.DestinationType.DATA_URL,  // Export as data-url for storing on cloud
    encodingType: this.camera.EncodingType.JPEG,            // Encode as JPEG
    correctOrientation: true,                               // Ensure camera is vertical
    mediaType: this.camera.MediaType.PICTURE                // Ensure media is only of type 'Picture'
  };

  /**
   * Contsructor for setting up appropriate objects
   *
   * @param camera          // Camera object used to take images
   * @param dataService     // Service used to access database images
   * @param toastCtrl       // Toast controller to display usefull information to user
   * @param afAuth          // Authorization object to access firebase users
   */
  constructor(
    private camera: Camera,
    private dataService: DataService,
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
  ) { }

  /**
   * Get images in order of date when creating front page tab
   */
  ngOnInit() {
    this.images = this.dataService.getDateImages();
  }

  /**
   * Takes image and stores relevant information in image object
   */
  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.image.userId = this.afAuth.auth.currentUser.uid;         // Store user id
      this.image.name = this.afAuth.auth.currentUser.displayName;   // Store user display name
      this.image.imageURL = 'data:image/jpeg;base64,' + imageData;  // Store image as base64 string
      this.image.date = new Date();                                 // Store current data + time
      this.image.id = this.image.userId + this.image.date;          // Create unique image id with uid and date

      this.addImage();
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Send image to service so it may upload to the firestore database
   */
  addImage() {
    this.dataService.addImage(this.image).then(() => {
      this.showToast('Image added');
    }, err => {
      this.showToast('Image failed to upload');
    });
  }

  /**
   * Adds one like to the image.likes object and then updates image in
   * firestore database.
   *
   * @param image        // Liked image to be updated
   */
  likePhoto(image: Image) {
    image.likes ++;
    this.dataService.updateImage(image).then(() => {
      this.showToast('Photo has been liked!');
    }, err => {
      image.likes --;    // If failed to update object with new likes, reverse image.like total locally
      this.showToast('Failed to like photo :(');
    });
  }

  /**
   * Basic show toast function for displaying usefull information to user
   *
   * @param msg         // Message to display to user
   */
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
