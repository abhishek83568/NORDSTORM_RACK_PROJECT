import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';



const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const faq = [
    { question: "How can I track my order?", answer: "You can track your order using the 'Track Order' page in your account." },
    { question: "What is your return policy?", answer: "You can return products within 30 days of delivery. Visit the 'Returns' section for more details." },
    { question: "How do I cancel my order?", answer: "To cancel an order, go to your order history and click on 'Cancel Order' for the respective item." },
    //{ question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to selected countries. Shipping charges may apply." },
    { question: "What payment methods are accepted?", answer: "We accept Credit/Debit Cards, PayPal, UPI, and Net Banking." },
  ];

  const contactSupport = {
    email: "support@ecommerce.com",
    phone: "+1 800-123-4567",
    hours: "9 AM to 9 PM, Mon-Sat",
  };

  const toggleChat = () => {
    if (!isOpen) {
      setMessages([
        { text: "Hi! Welcome to our store. How can I assist you today?", sender: "bot" },
        ...faq.map((q) => ({ text: q.question, sender: "bot", clickable: true })),
      ]);
    }
    setIsOpen(!isOpen);
  };

  const handleFAQClick = (answer) => {
    setMessages((prevMessages) => [...prevMessages, { text: answer, sender: "bot" }]);
  };

  const sendMessage = async () => {
    if (!input) return;

    setMessages((prevMessages) => [...prevMessages, { text: input, sender: "user" }]);
    setInput('');
    setIsTyping(true);

    const isMatchedFAQ = faq.find((q) => input.toLowerCase().includes(q.question.toLowerCase()));
    if (isMatchedFAQ) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: isMatchedFAQ.answer, sender: "bot" },
          { text: "If you need further assistance, please continue.", sender: "bot" },
        ]);
      }, 1500);
    } else {
      try {
        const response = await axios({
          method: "post",
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.REACT_APP_API_KEY}`,
          headers: { "Content-Type": "application/json" },
          data: {
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          },
        });

        const botReply =
          response.data.contents?.[0]?.parts?.[0]?.text ||
          `I'm sorry, I couldn't understand your question. Please contact support for further assistance.`;

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botReply, sender: "bot" },
            { text: "If you need further assistance, please continue.", sender: "bot" },
          ]);
        }, 1000);
      } catch (error) {
        console.error("Error fetching response:", error);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `I'm sorry, I couldn't understand your question`, sender: "bot" },
            { text: `Please contact support.`, sender: "bot", support: true },
          ]);
        }, 1500);
      }
    }
  };

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#FF6F61",
          color: "#fff",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  margin: "5px 0",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
                onClick={msg.clickable ? () => handleFAQClick(faq.find((q) => q.question === msg.text).answer) : null}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: msg.sender === "user" ? "#007BFF" : msg.clickable ? "#FF6F61" : "#F5F5F5",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    cursor: msg.clickable ? "pointer" : "default",
                  }}
                >
                  {msg.text}
                </span>

                {/* Render Contact Support Button if support flag is true */}
                {msg.support && (
                  <button
                    onClick={() => window.open(`mailto:${contactSupport.email}`)}
                    style={{
                      marginTop: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#FF6F61",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Contact Support
                  </button>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ textAlign: "left", color: "#888", marginTop: "10px" }}>
                typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Field */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#FF6F61",
                color: "#fff",
                border: "none",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
