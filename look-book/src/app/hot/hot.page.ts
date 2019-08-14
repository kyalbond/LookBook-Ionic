import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { Image, DataService } from '../data.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.page.html',
  styleUrls: ['./hot.page.scss'],
})
export class HotPage implements OnInit {

  public images: Observable<Image[]>;

  public image: Image = {
    id: '',
    userId: '',
    name: '',
    imageURL: '',
    date: null,
    likes: 0,
  };

  private options: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private camera: Camera,
    private dataService: DataService,
    private toastCtrl: ToastController,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.images = this.dataService.getLikeImages();
  }

  takePhoto() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.image.id = this.afAuth.auth.currentUser.email;
      this.image.name = this.afAuth.auth.currentUser.displayName;
      this.image.imageURL = 'data:image/jpeg;base64,' + imageData;
      this.image.date = new Date();

      this.addImage();
    }, (err) => {
      console.log(err);
    });
  }

  addImage() {
    this.dataService.addImage(this.image).then(() => {
      this.showToast('Image added');
    }, err => {
      this.showToast('Image failed to upload');
    });
  }

  likePhoto(image: Image) {
    image.likes ++;
    this.dataService.updateImage(image);
    this.showToast('Photo liked!');
  }
  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
