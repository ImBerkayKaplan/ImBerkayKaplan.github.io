import {
  ref,
  set,
  get,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { database } from "./firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  const fibonacciSeries = [1, 2, 3, 5, 8, 13, 21];
  const buttonsContainer = document.querySelector(".fibonacci-buttons");
  const revealButton = document.getElementById("reveal-button");
  const resetButton = document.getElementById("reset-button");
  const choicesDisplay = document.getElementById("choices-display");
  const voterNameInput = document.getElementById("voter-name");
  const joinButton = document.getElementById("join-button");
  const usersList = document.getElementById("users-list");

  let userId = null;

  // Function to join and register user online
  joinButton.addEventListener("click", () => {
    const voterName = voterNameInput.value.trim();
    if (!voterName) {
      alert("Please enter your name to join.");
      return;
    }

    userId = localStorage.getItem("userId") || Date.now();
    localStorage.setItem("userId", userId);

    set(ref(database, `users/${userId}`), { name: voterName, voted: false })
      .then(() => {
        joinButton.disabled = true;
        voterNameInput.disabled = true;
        buttonsContainer.classList.remove("hidden");
        revealButton.classList.remove("hidden");
        resetButton.classList.remove("hidden");
      })
      .catch((error) => console.error("Error joining:", error));
  });

  // Function to make a choice
  function makeChoice(choice) {
    if (!userId) {
      alert("Please join first by entering your name.");
      return;
    }

    const voterName = voterNameInput.value.trim();

    set(ref(database, `choices/${userId}`), { name: voterName, score: choice });
    set(ref(database, `users/${userId}`), {
      name: voterName,
      voted: true,
    }).catch((error) => console.error("Error saving choice:", error));
  }

  // Display online users and voting status
  onValue(ref(database, "users"), (snapshot) => {
    usersList.innerHTML = ""; // Clear the list before updating
    if (snapshot.exists()) {
      const users = snapshot.val();
      Object.values(users).forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name} - ${
          user.voted ? "Voted" : "Not Voted"
        }`;
        usersList.appendChild(listItem);
      });
    } else {
      // No users online, reset choices and UI
      resetScores();
      usersList.innerHTML = "<li>No users online.</li>";
    }
  });

  // Remove user on page exit
  window.addEventListener("beforeunload", () => {
    if (userId) {
      const userRef = ref(database, `users/${userId}`);
      const choiceRef = ref(database, `choices/${userId}`);
      Promise.all([remove(userRef), remove(choiceRef)]).catch((error) =>
        console.error("Error cleaning up on exit:", error)
      );
    }
  });

  // Create buttons for Fibonacci series
  fibonacciSeries.forEach((num) => {
    const button = document.createElement("button");
    button.textContent = num;
    button.dataset.value = num;
    button.addEventListener("click", () => makeChoice(num));
    buttonsContainer.appendChild(button);
  });

  // Reveal choices
  revealButton.addEventListener("click", () => {
    get(ref(database, "choices"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const choices = snapshot.val();
          const displayText = Object.values(choices)
            .map((choice) => `${choice.name}: ${choice.score}`)
            .join(", ");
          choicesDisplay.textContent = `Choices: ${displayText}`;
          choicesDisplay.classList.remove("hidden");
        } else {
          choicesDisplay.textContent = "No choices yet!";
          choicesDisplay.classList.remove("hidden");
        }
      })
      .catch((error) => console.error("Error fetching choices:", error));
  });

  // Reset scores and online status
  resetButton.addEventListener("click", () => {
    resetScores();
  });

  // Function to reset scores and update users
  function resetScores() {
    remove(ref(database, "choices"))
      .then(() => {
        get(ref(database, "users")).then((snapshot) => {
          if (snapshot.exists()) {
            const users = snapshot.val();
            Object.keys(users).forEach((userId) => {
              set(ref(database, `users/${userId}`), {
                ...users[userId],
                voted: false,
              });
            });
          }
        });
        choicesDisplay.textContent = "";
        choicesDisplay.classList.add("hidden");
      })
      .catch((error) => console.error("Error resetting choices:", error));
  }
});
