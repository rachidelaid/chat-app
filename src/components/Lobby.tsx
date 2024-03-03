import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";

const Lobby = ({ user }: { user: User }) => {
  const createGroup = async () => {
    const newId = uuidv4();
    await setDoc(doc(db, "groups", newId), {
      chat: [],
      users: [
        {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        },
      ],
    });

    window.location.href = `/${newId}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = e.currentTarget.elements[0] as HTMLInputElement;

    const docRef = doc(db, "groups", id.value.trim());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(
        doc(db, "groups", id.value.trim()),
        {
          users: [
            ...docSnap.data().users,
            {
              displayName: user.displayName,
              uid: user.uid,
              photoURL: user.photoURL,
            },
          ],
        },
        {
          merge: true,
        }
      );

      window.location.href = `/${id.value.trim()}`;
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-2xl font-bold">Welcome {user.displayName}</h1>
      <button
        className="p-2 bg-blue-500 rounded border border-blue-400"
        onClick={createGroup}
      >
        Start a group chat
      </button>
      <form className="flex flex-col gap-2 mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Group ID"
          className="bg-bg-300 outline-none ring-0 w-full border border-gray-700 p-1 rounded"
        />
        <button className="p-2 bg-bg-100 rounded border border-gray-700">
          Join a group chat
        </button>
      </form>
    </div>
  );
};

export default Lobby;
