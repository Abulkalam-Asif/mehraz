import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

const updateStyleInDB = async ({ id, name, image }) => {
	try {
		const docRef = doc(db, "Style", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			if (image !== null && image instanceof File) {
				const previousImageRef = ref(storage, `Style/${id}`);
				await deleteObject(previousImageRef);

				const imageRef = ref(storage, `Style/${id}`);
				await uploadBytes(imageRef, image);
			}

			await updateDoc(docRef, {
				name:name
			});

			return Promise.resolve("Style data updated successfully");
		} else {
			return Promise.reject(`Document with ID ${id} does not exist`);
		}
	} catch (error) {
		console.error("Firebase Error: " + error.message);
		return Promise.reject("Firebase Error: " + error.message);
	}
};

export default updateStyleInDB;
