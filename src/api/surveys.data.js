import db from "../firebase.config.js";
import {
	collection,
	getDoc,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	getDocs,
	writeBatch,
} from "firebase/firestore";

const surveysRef = collection(db, "surveys");

class SurveyData {
	addSurvey = (newSurvey) => {
		return addDoc(surveysRef, newSurvey);
	};
	//const q = collection(db, "surveys", id, "questions");

	addSurveyQuestions = (id, questions) => {
		const q = collection(db, "surveys", id, "questions");
		return;
	};

	// updateTemplate = (id, updatedTemplate) => {
	// 	const templateDoc = doc(db, "templates", id);
	// 	return updateDoc(templateDoc, updatedTemplate);
	// };

	// deleteTemplate = (id) => {
	// 	const templateDoc = doc(db, "templates", id);
	// 	return deleteDoc(templateDoc);
	// };
}
export default new SurveyData();
