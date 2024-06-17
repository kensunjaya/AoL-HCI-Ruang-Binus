import React, { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";
import { BeatLoader } from "react-spinners";
import { set } from "firebase/database";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import Markdown from "../components/Markdown";
import { useNavigate } from "react-router";

const genAI = new GoogleGenerativeAI("AIzaSyDPBX4bbIvXcupKTOc63rfpqismkktMLeU");

const ChatBot = () =>{
  const [forum, setForum] = useState("algo");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [chatContent, setChatContent] = useState<any[]>([]);
  const [model, setModel] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");


  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const md = new MarkdownIt();

  const getBotInformation = async () => {
    try {
      setPageLoading(true);
      const docRef = doc(db, "datas", "gemini");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Data does not exist in database!");
        return null;
      }
    } catch (e) {
      console.error("Error getting document:", e);
      return null;
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getBotInformation().then((data) => {
      if (data === null) return;
      setHistory(data.informations)
    });
  }, []);

  useEffect(() => { // autoscroll to bottom
    scrollToBottom();
  }, [chatContent]);

  useEffect(() => {
    // Fetch the generative model when the component mounts
    if (!user?.user) navigate('/signin');
    const fetchModel = async () => {
      try {
        setPageLoading(true);
        // classifier = await pipeline("sentiment-analysis");
        const generativeModel = await genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        setModel(generativeModel);
      } catch (error) {
        console.error("Error loading generative model:", error);
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };
    fetchModel();
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt]);

  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight + 10}px`;
    }
  };


  const getResponse = async () => {
    if (model) {
      if (!prompt) {
        return;
      }
      try {
        setLoading(true);
        // Add the user's prompt to the chat content and history
        setChatContent((prevChatContent) => [
          ...prevChatContent,
          { user: prompt, bot: "" },
        ]);
        const newHistory = [
          ...history,
          { role: "user", parts: [{ text: prompt }] },
        ];
        setHistory(newHistory);
        const tempPrompt = prompt;
        setPrompt("");
        console.log(newHistory);

        const chat = model.startChat({
          history: newHistory,
          generationConfig: {},
        });
        const result = await chat.sendMessage(tempPrompt);
        const res = await result.response;
        const text = await res.text(); // Await the text response

        // Update the bot response in the chat content
        setChatContent((prevChatContent) => {
          const updatedChatContent = [...prevChatContent];
          updatedChatContent[updatedChatContent.length - 1].bot = text;
          return updatedChatContent;
        });
        setHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", parts: [{ text: text }] },
        ]);
      } catch (error) {
        console.error("Error generating content:", error);
        setChatContent((prevChatContent) => {
          const updatedChatContent = [...prevChatContent];
          updatedChatContent[updatedChatContent.length - 1].bot =
            "Sorry, I couldn't answer that right now 😞, could you please ask another question?";
          return updatedChatContent;
        });
      } finally {
        setLoading(false);
        setPrompt("");
      }
    }
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      getResponse();
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 font-sans flex flex-col">
      {pageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <BeatLoader loading={pageLoading} size={50} color="white" margin={10}/>
          </div>
        )}
      <Navbar active="chatbot"/>
      <div className="m-[3vh] items-end mt-auto">
      <div className="flex-1 overflow-y-scroll w-full max-h-[80vh] mb-3 rounded-xl">
      <div className="w-full flex flex-col-reverse">
              <div className="justify-start flex">
                {user?.userData.nama !== "" ? (
                  <div className="mb-5 text-white bg-bluepale p-5 rounded-3xl max-w-[65%]">{`Selamat datang di Ruang Binus ${user?.userData.nama}👋, ada yang dapat kami bantu?`}</div>
                ) : (
                  <div className="my-5 text-white bg-bluepale p-5 rounded-3xl max-w-[65%]">
                    <BeatLoader
                      loading={true}
                      size={10}
                      color="white"
                      margin={3}
                    />
                  </div>
                )}
              </div>
            </div>
        {chatContent.map((content, index) => (
           <div key={index} className="w-full">
              <div className="justify-end flex">
                <div className="mb-5 text-white bg-blue-500 text-lg shadow-lg p-5 rounded-3xl max-w-[65%]">
                  <Markdown markdown={content.user} />
                </div>
              </div>
              <div className="justify-start flex">
                {content.bot ? (
                  <div className="mb-5 text-white bg-bluepale shadow-lg p-5 text-lg rounded-3xl max-w-[65%]">
                    <Markdown key={index} markdown={content.bot} />
                  </div>
                ) : (
                  <div className="my-5 text-white bg-bluepale p-5 rounded-3xl max-w-[65%]">
                    <BeatLoader
                      loading={loading}
                      size={10}
                      color="white"
                      margin={3}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
        </div>
        
        <div className="flex w-full">
          <textarea
            id="multiliner"
            placeholder="Type something ..."
            className="px-3 pt-3 shadow-lg rounded-xl text-black min-w-[100vh] font-sans mr-5 resize-none overflow-hidden bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-20 w-full"
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            ref={textareaRef}
          />
          <div className="items-end flex">
            <button className={`h-fit ${loading ? 'bg-gray-400' : 'bg-orange-400'} shadow-lg text-white`} onClick={() => getResponse()} disabled={loading}>Send</button>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default ChatBot