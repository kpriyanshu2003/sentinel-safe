import { db, auth } from "../../../firebase.config.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

const colRef = collection(db, "reviews");
const addReviews = async (props) => {
  // console.log("Location:", props.location, "Review:", props.review);

  try {
    await addDoc(colRef, {
      location: props.location,
      review: props.review,
      name: props.name,
      timestamp: new Date(),
    });

    console.log("Added review");
    deleterecord();
  } catch {
    console.log("Error adding review");
  }
};

export default addReviews;

export const getReviews = async (props) => {
  try {
    const querySnapshot = await getDocs(colRef);
    let reviews = [];

    querySnapshot.forEach((doc) => {
      reviews.push({ ...doc.data(), id: doc.id });
    });

    const first20Reviews = reviews.slice(0, 20);
  //  console.log(first20Reviews);
    return first20Reviews;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function deleterecord() {
  try {
    const MAX_RECORDS = 5;

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
}

// const q = query(colRef, where("location", "==", props.searchLocation));

// const querySnapshot = await getDocs(q);

// let reviews = [];

// querySnapshot.forEach((doc) => {
//   reviews.push({ ...doc.data(), id: doc.id });
// });

// console.log(reviews);
