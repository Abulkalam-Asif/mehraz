"use server";
import { db, storage } from "@/Firebase/firebase";
import { doc, updateDoc, getDoc,getDocs,query,where,collection } from "firebase/firestore";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { revalidatePath } from "next/cache";

const updateOfficeInDB = async ({ id, name, address, mapsLink, image }) => {

	try {
		//Fetching the Docs with the Same name
		const querySnapshot = await getDocs(
			query(collection(db, "OFFICES"), where("name", "==", name))
		);

		//validation (if the office with the same name already exists and the id is different)
		const duplicateOffice = querySnapshot.docs.find((doc) => doc.id !== id);
		if (duplicateOffice) {
			return {
				type: "ERROR",
				message: "Office with this name already exists.",
			};
		}

		const docRef = doc(db, "OFFICES", id);
		const docSnap = await getDoc(docRef);

		
		if (docSnap.exists()) {

			//Deleting old image and uploading new one if the new image is not null
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
			return { type: "SUCCESS", message: "Office updated successfully!" };
		} else {
			return {
				type: "ERROR",
				message: "Something went wrong, please try again later.",
			};
		}
	} catch (error) {
		console.error("Error updating the office:", error);
		return {
			type: "ERROR",
			message: "Something went wrong, please try again later.",
		};
	}
};

export default updateOfficeInDB;
