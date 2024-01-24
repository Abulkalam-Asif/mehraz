import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const addOfficeToDB = async ({ city, address, mapsLink, image }) => {
	const collectionRef = collection(db, "Office");
	try {
		const docRef = await addDoc(collectionRef, {
			city: city,
			address: address,
			mapsLink: mapsLink,
		});

		if (image == null) {
			throw new Error("Please select an image to upload");
		}

		const imageRef = ref(storage, `Office/${city}`);
		uploadBytes(imageRef, image);

		return Promise.resolve("Data writing and image upload successful");
	} catch (error) {
		console.error("Firebase Error: " + error.message);

		return Promise.reject("Firebase Error: " + error.message);
	}
};

export default addOfficeToDB;
