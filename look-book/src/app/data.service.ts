import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Image {
  id?: string;
  name: string;
  imageURL: string;
  date: Date;
  likes: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private images: Observable<Image[]>;
  private imageCollection: AngularFirestoreCollection<Image>;

  constructor(private afs: AngularFirestore) {
    this.imageCollection = this.afs.collection<Image>('images');
    this.images = this.imageCollection.snapshotChanges().pipe(
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
     return this.images;
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

   addImage(image: Image): Promise<DocumentReference> {
     return this.imageCollection.add(image);
   }

   updateImage(image: Image): Promise<void> {
     return this.imageCollection.doc(image.id).update({ name: image.name, image: image.imageURL, date: image.date});
   }

   deleteIdea(id: string): Promise<void> {
     return this.imageCollection.doc(id).delete();
   }
}
