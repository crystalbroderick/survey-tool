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
	setDoc,
} from "firebase/firestore";

const surveysRef = collection(db, "surveys");
//const userSurveyRef = collection(db, "users", currentUser, "surveys");

class SurveyData {
	// add to all surveys - includes user id
	addSurvey = (newSurvey) => {
		return addDoc(surveysRef, newSurvey);
	};
	//const q = collection(db, "surveys", id, "questions");

	addSurveyQuestions = (question, surveyId) => {
		const questionsRef = collection(db, "surveys", surveyId, "questions");
		return addDoc(questionsRef, question);
	};

	// setDoc(doc(db, "users", user.user.uid)
	//addUserSurvey = (newSurvey) => {
	// 	return addDoc(userSurveyRef, newSurvey);
	// 	// .then(
	// 	// (res) => {
	// 	// 	addDoc(doc(db, userSurveyRef, { email: email });
	// 	// }
	// };
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
