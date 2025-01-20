# Quiz Application

## Overview
The Quiz Application is a dynamic and interactive web-based tool designed to enhance learning and assessment experiences. It features a user-friendly interface for answering quiz questions, tracking progress, and viewing results. This application utilizes modern React.js principles such as component-based architecture, state management with hooks, and localStorage integration to ensure a seamless and engaging user experience.

### Key Features:
- **Randomized Questions**: Ensures a unique quiz-taking experience by shuffling answer options.
- **Progress Tracking**: Tracks answered questions and retains progress even after page refresh using localStorage.
- **Timer Integration**: Enforces time limits to complete the quiz, providing an authentic assessment experience.
- **Results Visualization**: Displays detailed feedback on answers, including scores and a breakdown of correct/incorrect responses.

## Components
- **Sidebar**: Allows users to navigate between questions.
- **Timer**: Tracks and displays the remaining time for the quiz.
- **Question Component**: Dynamically renders questions and options for the user to answer.
- **Results Page**: Provides a detailed summary of the user’s performance.
- **Confirmation Modal**: Confirms quiz submission to prevent accidental submissions.

## Setup and Installation
To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd quiz-application
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:5173` to access the application.

## Assumptions
- The quiz data (questions and options) is fetched from an external API or stored in localStorage.
- Each question has exactly four answer options.
- Users will complete the quiz within the allocated time.

## Challenges and Solutions
### Challenge 1: Handling Data Persistence
- **Problem**: Ensuring that user progress is retained during page refresh.
- **Solution**: Integrated `localStorage` to store quiz state, including answered questions, timer progress, and results.

### Challenge 2: Dynamic Option Shuffling
- **Problem**: Providing a unique experience for each quiz attempt by shuffling answer options.
- **Solution**: Implemented a `shuffleOptions` function to randomize options for every question dynamically.

### Challenge 3: Timer Synchronization
- **Problem**: Maintaining consistent timer behavior across components.
- **Solution**: Used React hooks to manage and synchronize the timer state, ensuring accuracy.

### Challenge 4: User-Friendly Navigation
- **Problem**: Allowing users to easily navigate between questions.
- **Solution**: Developed a `Sidebar` component with clear indicators for answered/unanswered questions.

---
Feel free to contribute to the project by submitting issues or pull requests. For further queries, contact the repository maintainer.

