"use server";
import { db, storage } from "../../../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const deleteOfficeFromDB = async (officeId) => {
	try {
		const docRef = doc(db, "OFFICES", officeId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			await deleteDoc(docRef);

			const imageRef = ref(storage, `OFFICES/${officeId}`);
			await deleteObject(imageRef);

			revalidatePath("/admin/roles-analytics-cities", "page");
			return {
				type: "success",
				message: "Office deleted successfully.",
			};
		} else {
			return {
				type: "error",
				message: "Something went wrong, please try again later.",
			};
		}
	} catch (error) {
		console.error("Error deleting the office: ", error);
		return {
			type: "error",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default deleteOfficeFromDB;
