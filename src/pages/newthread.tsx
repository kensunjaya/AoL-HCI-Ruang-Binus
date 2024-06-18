import { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dropdown from "../assets/images/dropdown.png";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseSetup";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { set } from "firebase/database";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

const NewThread = () => {
  const [forum, setForum] = useState("algo");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea

  useEffect(() => { // render sebelum return (hanya 1x)
    if (!auth.currentUser) {
      navigate("/signin", { state: { showToast: true } });
    }
    else if (user?.category) {
      setForum(user?.category);
    }
  }, []);

  const getForumData = async () => {
    try {
      const docRef = doc(db, "datas", "forum");
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
    }
  };

  const postThread = async () => {
    if (title === "" || content === "") {
      setErrorMsg("Please fill in all required fields!");
      return;
    }
    try {
      setLoading(true);
      let forumContent = await getForumData();
      if (forumContent)
        forumContent[forum].push({
          author: user?.userData.nama,
          title: title,
          content: content,
          date: new Date().toLocaleDateString(),
          replies: [],
        });
      if (forumContent) {
        await updateDoc(doc(db, "datas", "forum"), {
          [forum]: forumContent[forum],
        });
      }
      toast.success("Thread posted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/forum", { state: { showToast: true } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const insertCodeBlock = () => {
    const textarea = textareaRef.current;
    let codeBlock = "```\n\n```\n";
    if (content.length > 0 || content[-1] === '\n' || content[-1] === '\r') {
      codeBlock = "\n```\n\n```\n";
    }
    const cursorPosition = textarea?.selectionStart;
  
    if (cursorPosition !== undefined) {
      const newContent =
        content.slice(0, cursorPosition) +
        codeBlock +
        content.slice(cursorPosition);
  
      setContent(newContent);
  
      setTimeout(() => {
        textarea?.focus();
        textarea?.setSelectionRange(
          cursorPosition + 5, // Position inside the code block
          content.length > 0 || content[-1] === '\n' || content[-1] === '\r' ? cursorPosition + 5 : cursorPosition + 4 // Position after the code block
        );
      }, 0);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35} />
        </div>
      )}

      <Navbar active="forum" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex m-[3vh]">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-4xl my-6 font-sans">Subject</div>
          <CustomButton
            title="Algorithm and Programming"
            style={`${
              forum === "algo" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6 mt-3`}
            onClick={() => setForum("algo")}
          />
          <br />
          <CustomButton
            title="Program Design Methods"
            style={`${
              forum === "pdm" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6`}
            onClick={() => setForum("pdm")}
          />
          <br />
          <CustomButton
            title="Basic Statistics"
            style={`${
              forum === "bastat" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6`}
            onClick={() => setForum("bastat")}
          />
          <br />
          <CustomButton
            title="Character Building: Pancasila"
            style={`${
              forum === "cb" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6`}
            onClick={() => setForum("cb")}
          />
          <br />
          <CustomButton
            title="Discrete Mathematics"
            style={`${
              forum === "discrete" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6`}
            onClick={() => setForum("discrete")}
          />
          <br />
          <CustomButton
            title="Indonesian"
            style={`${
              forum === "indo" ? "bg-green-600" : "bg-bluepale"
            } w-[35vh] font-sans text-white mb-6`}
            onClick={() => setForum("indo")}
          />
        </div>
        <div>
          <div className="bg-orange-400 h-fit w-[74vw] m-[5vh] rounded-3xl p-[2vh] font-sans shadow-xl">
            <div className="items-center justify-start flex">
              <div className="w-full font-semibold text-3xl">{"New thread"}</div>
            </div>
            <div>
              <input
                type="text"
                placeholder="title"
                className="p-3 rounded-xl bg-white text-black w-[50%] shadow-lg mt-5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <textarea
                ref={textareaRef} // Attach the ref to the textarea
                placeholder="content"
                className="p-3 rounded-xl bg-white text-black w-full shadow-lg mt-5 min-h-[20vh]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <br />
              <button
                className="bg-white text-black text-lg font-mono font-bold mt-5 p-2"
                onClick={insertCodeBlock}
              >
                {"</>"}
              </button>
              <br />
              {errorMsg !== "" && (
                <div className="text-red-500 mb-5 mt-5">{errorMsg}</div>
              )}
              <button
                className="bg-graystitle text-black text-lg mt-5"
                onClick={() => postThread()}
              >
                Post thread
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewThread;
