"use server";
import { db, storage } from "../firebase";
import { doc, updateDoc, getDoc,getDocs,query,where,collection } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const updateOfficeInDB = async ({ id, name, address, mapsLink, image }) => {
	try {
		const querySnapshot = await getDocs(
			query(collection(db, "OFFICES"), where("name", "==", name))
		);
		const duplicateOffice = querySnapshot.docs.find((doc) => doc.id !== id);
		if (duplicateOffice) {
			return {
				type: "error",
				message: "Office with this name already exists.",
			};
		}

		const docRef = doc(db, "OFFICES", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			if (image !== null && image instanceof FormData) {
				const previousImageRef = ref(storage, `OFFICES/${id}`);
				await deleteObject(previousImageRef);

				const imageRef = ref(storage, `OFFICES/${id}`);
				await uploadBytes(imageRef, image.get("image"));
			}

			await updateDoc(docRef, {
				name: name,
				address: address,
				mapsLink: mapsLink,
			});

			revalidatePath("/admin/roles-analytics-cities", "page");
			return { type: "success", message: "Office updated successfully!" };
		} else {
			return {
				type: "error",
				message: "Something went wrong, please try again later.",
			};
		}
	} catch (error) {
		console.error("Error updating the office:", error);
		return {
			type: "error",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default updateOfficeInDB;
