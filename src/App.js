import React, { useState } from "react";

const App = () => {
  // List of player names and IDs
  const playerList = [
    { id: "0001-001", name: "Juan Dela Cruz" },
    { id: "0001-002", name: "Maria Santos" },
    { id: "0001-003", name: "Jose Rizal" },
    { id: "0001-004", name: "Ana Reyes" },
    { id: "0001-005", name: "Pedro Gomez" },
    { id: "0001-096", name: "Mikaela Santos" }, // Ensure "Mika" is in the list
  ];

  // States for the student's name, message, slots, spinning status, and spin count
  const [studentNumber, setStudentNumber] = useState("");
  const [message, setMessage] = useState("");
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [spinning, setSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const emojis = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "7️⃣", "🍉"];

  // Function to get a random emoji
  const getRandomEmoji = () =>
    emojis[Math.floor(Math.random() * emojis.length)];

  // Function to start the spin
  const spinSlots = () => {
    const interval = setInterval(() => {
      setSlots([getRandomEmoji(), getRandomEmoji(), getRandomEmoji()]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const final = [getRandomEmoji(), getRandomEmoji(), getRandomEmoji()];

      // Check if the player is "Mika"
      if (studentNumber === "Mika") {
        // Make sure all emojis are the same for Mika
        const jackpotEmoji = getRandomEmoji();
        setSlots([jackpotEmoji, jackpotEmoji, jackpotEmoji]);
        setMessage(`🎉 JACKPOT, ${studentNumber}!`);
      } else if (final[0] === final[1] && final[1] === final[2]) {
        setSlots(final);
        setMessage(`🎉 JACKPOT, ${studentNumber || "player"}!`);
      } else {
        setSlots(final);
        setMessage(
          `😢 Sorry ${studentNumber || "player"}, try again next time!`
        );
      }

      setSpinning(false);
    }, 2500);
  };

  // Function to handle the Play button click
  const handlePlay = () => {
    if (spinning) return;

    if (studentNumber.trim() === "") {
      setMessage("Please enter your name or student number.");
      return;
    }

    if (spinCount >= 3) {
      setMessage(
        `${studentNumber || "Player"}, you've reached the maximum 3 spins.`
      );
      return;
    }

    setMessage("");
    setSpinCount(spinCount + 1);
    setSpinning(true);
    spinSlots();
  };

  // Inline styles for the components
  const styles = {
    app: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      textAlign: "center",
      padding: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "10px",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
      width: "300px",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#ffde59",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
      color: "#333",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#ffde59",
      border: "none",
      borderRadius: "5px",
      fontSize: "1.2rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonDisabled: {
      backgroundColor: "#aaa",
      cursor: "not-allowed",
    },
    slots: {
      fontSize: "3rem",
      marginTop: "20px",
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "20px",
    },
    message: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#ffde59",
      marginTop: "20px",
      animation: "fadeIn 2s ease-in-out",
    },
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎰 Slot Machine</h1>
        <input
          type="text"
          placeholder="Enter Name or Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={handlePlay}
          style={
            spinCount >= 3
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
          disabled={spinCount >= 3}
        >
          Play
        </button>
        <div style={styles.slots}>
          {slots.map((slot, index) => (
            <div key={index}>{slot}</div>
          ))}
        </div>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default App;
