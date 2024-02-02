import { db } from "../firebase";
import { deleteDoc, doc, collection, getDoc } from "firebase/firestore";

const deletePlotFromDB = async (id) => {
	try {
		const PlotRef = doc(db, "Plot", id);
		const docSnapshot = await getDoc(PlotRef);

		if (docSnapshot.exists()) {
			let usage = docSnapshot.data().usage;
			if (usage.projects !== 0) {
				return "Usage is not zero. Deletion failed.";
			}

			await deleteDoc(PlotRef);

			return "Document deleted successfully.";
		} else {
			return "Document does not exist. Deletion failed.";
		}
	} catch (error) {
		return "Error deleting document: " + error.message;
	}
};

export default deletePlotFromDB;
