import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./utils/firebase";
import { PaperAirplaneIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useDocument } from "react-firebase-hooks/firestore";

import Login from "./components/Login";
import Loading from "./components/Loading";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { doc, setDoc } from "firebase/firestore";
import Lobby from "./components/Lobby";
import { useState } from "react";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const id = window.location.pathname.substring(1);

  const [user, loading] = useAuthState(auth);
  const [value, typing] = useDocument(
    doc(db, "groups", id || "QUTUKBcAeqmZ159rHe3J"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (loading) return <Loading />;
  if (!user) return <Login />;

  if (!id) return <Lobby user={user} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.elements[0] as HTMLInputElement;

    await setDoc(
      doc(db, "groups", id),
      {
        chat: [
          ...(value?.data()?.chat || []),
          {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            content: input.value.trim(),
            timestamp: Date.now(),
          },
        ],
      },
      {
        merge: true,
      }
    );

    input.value = "";
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar
        user={user}
        users={value?.data()?.users}
        open={openSidebar}
        setOpen={setOpenSidebar}
      />
      <div className="flex flex-col w-full h-full">
        <div className="flex p-4 py-2 items-center shadow-lg gap-2">
          <Bars3Icon
            className="w-4 h-4 cursor-pointer md:hidden"
            onClick={() => setOpenSidebar(true)}
          />
          <p>React Chat App</p>
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-4 p-2 md:p-4 h-[calc(100%-40px)]">
          <Main typing={typing} chat={value?.data()?.chat} />

          <form
            onSubmit={handleSubmit}
            className="bg-bg-300 p-1 rounded flex items-center gap-1 w-full mt-auto"
          >
            <input
              type="text"
              placeholder="Type a message here"
              className="bg-transparent outline-none ring-0 w-full"
            />
            <button className="bg-blue-500 p-1 rounded">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
