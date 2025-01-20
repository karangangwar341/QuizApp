import axios from "axios";

export const fetchData = async () => {
  try {
    const res = await axios.get("https://opentdb.com/api.php?amount=15");

    // Transform the fetched data to match the desired schema
    const questions = res.data.results.map((item, index) => ({
      id: index, // Generate a unique ID for each question
      category: item.category,
      difficulty: item.difficulty,
      type: item.type,
      question: item.question,
      correctAnswer: item.correct_answer,
      incorrectAnswers: item.incorrect_answers,
    }));

    // Store the questions in localStorage
    localStorage.setItem("questions", JSON.stringify(questions));

    // Return the transformed questions
    return questions;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
