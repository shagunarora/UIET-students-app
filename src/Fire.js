import * as firebase from "firebase";
import "firebase/firestore";

const collectionName = "cards";

class Fire {
  post = async ({ title, detail, contact, email }) => {
    try {
      this.collection.add({
        title,
        detail,
        contact,
        email
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  getPaged = async ({ size, start }) => {
    let ref = this.collection;
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          const post = doc.data();
          const reduced = {
            key: doc.id,

            ...post
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };
  getMyPage = async () => {
    const { currentUser } = firebase.auth();

    let ref = this.collection.where(
      "email",
      "==",
      currentUser && currentUser.email
    );
    try {
      const querySnapshot = await ref.get();
      if (querySnapshot) {
        const data = [];
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            const post = doc.data();
            const reduced = {
              key: doc.id,

              ...post
            };
            data.push(reduced);
          }
        });
        return { data };
      } else {
        return 0;
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  get collection() {
    return firebase.firestore().collection(collectionName);
  }
}

Fire.shared = new Fire();
export default Fire;
