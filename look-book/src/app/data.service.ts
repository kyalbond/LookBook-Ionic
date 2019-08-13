import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Image {
  id: string;
  userId: string;
  name: string;
  imageURL: string;
  date: Date;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private imageCollection: AngularFirestoreCollection<Image>;
  private likeCollection: AngularFirestoreCollection<Image>;

  constructor(public afs: AngularFirestore) {
    this.imageCollection = this.afs.collection<Image>('images', ref => {
      return ref.orderBy('date', 'desc');
    });

    this.likeCollection = this.afs.collection<Image>('images', ref => {
      return ref.orderBy('likes', 'desc');
    });
   }

   getLikeImages() {
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

   getImages(): Observable<Image[]> {
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

   getImage(id: string): Observable<Image> {
     return this.imageCollection.doc<Image>(id).valueChanges().pipe(
       take(1),
       map(image => {
         image.id = id;
         return image;
       })
     );
   }

   addImage(image: Image): Promise<void> {
     return this.imageCollection.doc(image.id).set(image);
   }

   updateImage(image: Image): Promise<void> {
     return this.imageCollection.doc(image.id)
     .update(image);
   }

   deleteIdea(id: string): Promise<void> {
     return this.imageCollection.doc(id).delete();
   }
}
