import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseSetup";
import { BeatLoader } from "react-spinners";
import { set } from "firebase/database";

const ReplyForum = () =>{
  const [forum, setForum] = useState("algo");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [forumData, setForumData] = useState<any>();
  const user = useContext(AuthContext);


  useEffect(() => {
    if (user?.category) {
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
      setErrorMsg("Comment cannot be empty!");
      return;
    }
    try {
      setLoading(true);
      let tempContent = await getForumData();
      if (tempContent) {
        tempContent[forum][user?.forumContent.index].replies.push({
          author: user?.userData.nama,
          content: content,
        });
        user?.setForumContent(tempContent[forum][user?.forumContent.index])
        await updateDoc(doc(db, "datas", "forum"), {
          [forum]: tempContent[forum]
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <BeatLoader loading={loading} size={50} color="white" margin={10}/>
          </div>
        )}
      <Navbar active="forum"/>
      <div className="m-[3vh]">
        <div>
          <div className="bg-orange-400 h-fit m-[5vh] mb-[3vh] rounded-2xl p-[2vh] font-sans shadow-xl">
            <div className="items-center justify-start flex">
              <div className="w-full font-semibold text-3xl text-white">{user?.forumContent.title}</div>
              <div className="w-full text-2xl text-white text-end">{user?.forumContent.date}</div>
            </div>
            <div className="my-5 text-lg bg-white text-black p-5 rounded-xl">
              <div className="text-xl font-semibold">{user?.forumContent.author}:</div>
              <div>{user?.forumContent.content}</div>
            </div>
          </div>
          <div className="mx-[5vh] text-black font-sans font-semibold text-xl">Discussions</div>
          <div className="bg-orange-400 h-fit mx-[5vh] my-[2vh] rounded-2xl p-[2vh] font-sans shadow-xl">
          <textarea placeholder="Write a comment" className="p-3 rounded-xl bg-white text-black w-full shadow-lg mt-5 min-h-[15vh]" value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={() => replyThread()} className="mt-5 bg-graystitle text-black text-lg">Comment</button>
          {errorMsg && <div className="text-red-500">{errorMsg}</div>}
          <div className="font-semibold text-xl mt-5 text-white">Replies:</div>
          {user?.forumContent?.replies?.map((reply: any) => (
              <div className="my-5 text-lg bg-white text-black p-5 rounded-xl">
                <div className="text-xl font-semibold">{reply.author}:</div>
                <div>{reply.content}</div>
              </div>
          ))}
          {user?.forumContent?.replies?.length === 0 && <div className="text-white">No replies yet!</div>}
          </div>
          
        </div>
      </div>
    </div>
    
  );
}

export default ReplyForum