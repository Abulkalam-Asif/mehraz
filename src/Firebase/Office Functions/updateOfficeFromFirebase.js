import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes,deleteObject } from "firebase/storage";

const updateOfficeInDB = async ({
	id,
	city,
	address,
	mapsLink,
	image,
}) => {
	try {
		const docRef = doc(db, "Office",id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			if (image !== null && image instanceof File) {
				const previousImageRef = ref(storage, `Office/${id}`);
				await deleteObject(previousImageRef);


				const imageRef = ref(storage, `Office/${id}`);
				await uploadBytes(imageRef, image);
			}

			await updateDoc(docRef, {
				city: city,
				address: address,
				mapsLink: mapsLink,
			});

			return Promise.resolve("Office data updated successfully");
		} else {
			return Promise.reject(`Document with ID ${id} does not exist`);
		}
	} catch (error) {
		console.error("Firebase Error: " + error.message);
		return Promise.reject("Firebase Error: " + error.message);
	}
};

export default updateOfficeInDB;
