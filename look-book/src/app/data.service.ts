import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Service class for retrieving and manipulating information from the
 * firebase database.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private imageCollection: AngularFirestoreCollection<Image>;       // Collection of images ordered by date
  private likeCollection: AngularFirestoreCollection<Image>;        // Collection of images ordered by likes

  /**
   * Initiate image collections with approripate order
   *
   * @param afs      AngularFireStore for retrieving database information.
   */
  constructor(public afs: AngularFirestore) {
    // Retrieve image collection ordered by date
    this.imageCollection = this.afs.collection<Image>('images', ref => {
      return ref.orderBy('date', 'desc');
    });
    // Retrieve image collection ordered by likse
    this.likeCollection = this.afs.collection<Image>('images', ref => {
      return ref.orderBy('likes', 'desc');
    });
  }

  /**
   * Requests updates on sorted image collection
   *
   * @return          A live observable image array
   */
  getLikeImages(): Observable<Image[]> {
    return this.likeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Requests updates on sorted image collection
   *
   * @return          A live observable image array
   */
  getDateImages(): Observable<Image[]> {
    return this.imageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Get an image with the corresponding ID
   *
   * @param id        ID of image (User ID + Date)
   * @return          A live observable image array
   */
  getImage(id: string): Observable<Image> {
    return this.imageCollection.doc<Image>(id).valueChanges().pipe(
      take(1),
      map(image => {
        image.id = id;
        return image;
      })
    );
  }

  /**
   * Add image to the database
   *
   * @param image     Image taken from user at dashboard
   */
  addImage(image: Image): Promise<void> {
    return this.imageCollection.doc(image.id).set(image);
  }

  /**
   * Update image with new image
   *
   * @param image     Image chosen by the user at dashboard
   */
  updateImage(image: Image): Promise<void> {
    return this.imageCollection.doc(image.id).update(image);
  }

  /**
   * Delete image with the given ID (User ID + Date)
   *
   * @param id        ID of image to be delted
   */
  deleteIdea(id: string): Promise<void> {
    return this.imageCollection.doc(id).delete();
  }
}

/**
 * Class for packaging information on images
 */
export interface Image {
  id: string;
  userId: string;
  name: string;
  imageURL: string;
  date: Date;
  likes: number;
}
