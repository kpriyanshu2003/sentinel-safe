import { db } from "../firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const addReviews = async (props) => {
  const colRef = collection(db, props.location);
  try {
    await addDoc(colRef, {
      email: props.email,
      name: props.name,
      review: props.review,
      sentiment: 0,
      updatedAt: new Date(),
    });

    console.log("Added review");
    deleterecord({ location: props.location });
  } catch {
    console.log("Error adding review");
  }
};

export default addReviews;

export const getReviews = async (props) => {
  if (props.location) {
    const colRef = collection(db, props.location);
    try {
      const querySnapshot = await getDocs(colRef);
      let reviews = [];

      querySnapshot.forEach((doc) => {
        reviews.push({ ...doc.data(), id: doc.id });
      });

      const first20Reviews = reviews.slice(0, 20);

      return first20Reviews;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
const deleterecord = async (props) => {
  const colRef = collection(db, props.location);
  try {
    const MAX_RECORDS = 10;

    const querySnapshot = await getDocs(colRef);
    const totalRecords = querySnapshot.size;
    console.log("total", totalRecords);
    if (totalRecords > MAX_RECORDS) {
      const oldestRecordsQuery = query(
        colRef,
        orderBy("timestamp"),
        limit(totalRecords - MAX_RECORDS)
      );

      const oldestRecordsSnapshot = await getDocs(oldestRecordsQuery);

      oldestRecordsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    }
  } catch (error) {
    console.error("Error deleting old records:", error);
  }
};
