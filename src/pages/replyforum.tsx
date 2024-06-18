import { useContext, useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseSetup";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { set } from "firebase/database";
import Markdown from "../components/Markdown";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

const ReplyForum = () =>{
  const [forum, setForum] = useState("algo");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref for the textarea


  useEffect(() => {
    if (!auth.currentUser) navigate("/signin", { state: { showToast: true } });
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

  // useEffect(() => {
  //   getForumData().then((data) => {
  //     if (data === null) return;
  //     setForumData(data as any);
  //   });
  // }, []);


  const replyThread = async () => {
    if (content === "") {
      toast.error("Comment cannot be empty!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      setLoading(true);
      let tempContent = await getForumData();
      if (tempContent) {
        console.log(user?.forumContent);
        tempContent[forum][user?.forumContent?.index].replies.push({
          author: user?.userData.nama,
          content: content,
        });
        await updateDoc(doc(db, "datas", "forum"), {
          [forum]: tempContent[forum]
        });
        tempContent[forum][user?.forumContent?.index].index = user?.forumContent?.index;
        user?.setForumContent(tempContent[forum][user?.forumContent?.index]);
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
      setContent("");
    } catch (error) {
      console.log(error);
      toast.error("Error posting thread!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  }

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
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 flex flex-col">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
        </div>
      )}
      <Navbar active="forum"/>
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
      <div className="m-[3vh] mt-0 flex-1 flex-grow">
        <div>
          <div className="bg-orange-400 h-fit m-[5vh] mt-[1vh] mb-[3vh] rounded-2xl p-[2vh] font-sans shadow-xl">
            <div className="items-center justify-start flex">
              <div className="w-full font-semibold text-3xl text-white">{user?.forumContent.title}</div>
              <div className="w-full text-2xl text-white text-end">{user?.forumContent.date}</div>
            </div>
            <div className="my-5 text-lg bg-white text-black p-5 rounded-xl">
              <div className="text-xl font-semibold">{user?.forumContent.author}:</div>
              <div><Markdown markdown={user?.forumContent.content} /></div>
            </div>
          </div>
          <div className="mx-[5vh] text-black font-sans font-semibold text-xl">Discussions</div>
          <div className="bg-orange-400 h-fit mx-[5vh] my-[2vh] rounded-2xl p-[2vh] font-sans shadow-xl">
            <textarea ref={textareaRef} placeholder="Write a comment" className="p-3 rounded-xl bg-white text-black w-full shadow-lg mt-5 min-h-[15vh]" value={content} onChange={(e) => setContent(e.target.value)} />
            <button
              className="bg-white text-black text-lg font-mono font-bold mt-5 p-2"
              onClick={insertCodeBlock}
            >
              {"</>"}
            </button>
            <br />
            <button onClick={() => replyThread()} className="mt-5 bg-graystitle text-black text-lg">Comment</button>
            <div className="font-semibold text-xl mt-5 text-white">{`Replies (${user?.forumContent?.replies?.length.toString()}):`}</div>
            {user?.forumContent?.replies?.map((reply: any, index: number) => (
                <div key={index} className="my-5 text-lg bg-white text-black p-5 rounded-xl">
                  <div className="text-xl font-semibold">{reply.author}:</div>
                  <div><Markdown markdown={reply.content} /></div>
                </div>
            ))}
            {user?.forumContent?.replies?.length === 0 && <div className="text-white">No replies yet!</div>}
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default ReplyForum