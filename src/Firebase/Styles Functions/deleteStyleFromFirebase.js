import { db, storage } from "../firebase";
import { getDoc,doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const deleteStyleFromDB = async (styleId) => {
	try {
		const docRef = doc(db, "Style", styleId);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			const data = docSnapshot.data();

			if (data) {
				const imageRef = ref(storage, `Style/${styleId}`);
				await deleteObject(imageRef);
			}

			await deleteDoc(docRef);

			return Promise.resolve(
				"Style data and associated image deleted successfully"
			);
		} else {
			return Promise.reject(`Style with ID ${styleId} does not exist`);
		}
	} catch (error) {
		console.error("Firebase Error: " + error.message);
		return Promise.reject("Firebase Error: " + error.message);
	}
};

export default deleteStyleFromDB;
