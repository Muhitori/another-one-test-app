import { DocumentData, QuerySnapshot } from '@firebase/firestore-types';
import firebase from '../common/firebaseApp';
import { Flat } from '../types';

export class FlatService {
  private static firestore = firebase.firestore();

  private static getFlatsFormSnapshot(snapshot: QuerySnapshot<DocumentData>) {
    let flats: Flat[] = [];
    snapshot.forEach((flat) => {
      flats = [...flats, flat.data() as Flat];
    });
    return flats;
  }

  static async getAll(): Promise<Flat[]> {
    const snapshot = await this.firestore.collection('flats').get();
    return this.getFlatsFormSnapshot(snapshot);
  }

  static async getByCountry(address: string): Promise<Flat[]> {
    const snapshot = await this.firestore
      .collection('flats')
      .where('address', '==', address)
      .get();

    return this.getFlatsFormSnapshot(snapshot);
  }
}

export default FlatService;
