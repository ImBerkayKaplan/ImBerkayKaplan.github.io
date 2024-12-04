// Import the required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// I know my API key is exposed below. My billing is turned off, so it will not go beyond free tier.
const firebaseConfig = {
  apiKey: "AIzaSyD20fLBWegqQQm0Dyxo89hn0avuUiOJ9Is",
  authDomain: "task-scoring.firebaseapp.com",
  projectId: "task-scoring",
  storageBucket: "task-scoring.firebasestorage.app",
  messagingSenderId: "205789588498",
  appId: "1:205789588498:web:fd0e6a00464574f884fccb",
  measurementId: "G-WHX37S511F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the database for use in other scripts
export { database };
