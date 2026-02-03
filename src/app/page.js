"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function ValentinePage() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = ["No", "Are you sure? 🤨", "Really?? 💔", "Try again! 😤", "You sure? 🥺", "No escape! ❤️", "Rimsha, please! 🌹"];

  const sendEmail = () => {
    const templateParams = {
      time: new Date().toLocaleString(),
      message: "Rimsha said YES! ❤️",
    };

    emailjs.send(
      "service_qg7c39c",    // Aapki Service ID
      "template_kmi1y4j",   // Aapki Template ID
      templateParams,
      "rkfX7tsKWSTepi_kV"   // Aapki Public Key
    )
    .then(() => {
      console.log("SUCCESS! Email sent to your Gmail.");
    })
    .catch((err) => {
      console.error("FAILED...", err);
    });
  };

  const handleYes = () => {
    setAccepted(true);
    sendEmail(); 
  };

  const moveButton = () => {
    const x = Math.random() * 400 - 200;
    const y = Math.random() * 400 - 200;
    setNoButtonPos({ x, y });
    setYesSize(yesSize + 0.4);
    if (messageIndex < messages.length - 1) setMessageIndex(messageIndex + 1);
  };

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center p-4">
        {/* Image Fix: Terminal error khatam karne ke liye .jpeg use kiya hai */}
        <img src="/anushka-happy.jpeg" alt="Success" className="w-64 h-64 object-cover mb-6 rounded-2xl shadow-2xl border-4 border-white" />
        <h1 className="text-5xl font-bold text-red-600">Hehe, I knew it! ❤️</h1>
        <p className="mt-4 text-gray-600 italic font-semibold text-xl text-pink-500">I love you, Rimsha! 🌹</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-pink-50 relative overflow-hidden p-6 text-center">
      <img src="/anushka-happy.jpeg" alt="Main Pic" className="w-48 h-48 object-cover mb-8 rounded-full shadow-lg border-4 border-pink-200" />
      <h1 className="text-4xl font-extrabold text-pink-700 mb-12 drop-shadow-sm">Rimsha, Will you be my everything? 🌹</h1>
      <div className="flex gap-6 items-center justify-center">
        <button
          style={{ transform: `scale(${yesSize})` }}
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all"
          onClick={handleYes}
        >Yes! ✅</button>
        <motion.button
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          onMouseEnter={moveButton}
          className="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
        >{messages[messageIndex]}</motion.button>
      </div>
    </main>
  );
}