import {
  ChevronLeftIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { User, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Sidebar = ({ user, users = [] }: { user: User; users?: User[] }) => {
  return (
    <div className="flex flex-col gap-3 bg-bg-100 w-52">
      <div className="p-2 flex items-center gap-2 border-b border-bg-300">
        <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
        <p>All channels</p>
      </div>

      {users?.map((usr) => (
        <div
          className="flex gap-2 items-center text-gray-400 p-2"
          key={usr.uid}
        >
          <img
            src={usr.photoURL || "/placeholder.png"}
            alt={usr.displayName || "user's avatar"}
            className="w-6 h-6 rounded-sm"
          />
          <p>{usr.displayName}</p>
        </div>
      ))}

      <div className="border-t text-gray-500 font-semibold text-sm border-bg-300 p-2 mt-auto flex items-center gap-2">
        <img
          src={user.photoURL ?? "/placeholder.png"}
          alt={user.displayName || "user's avatar"}
          className="w-5 h-5 rounded-sm"
        />
        <p>{user.displayName}</p>
        <ArrowRightEndOnRectangleIcon
          onClick={() => signOut(auth)}
          className="w-4 h-4 cursor-pointer ml-auto text-red-500"
        />
      </div>
    </div>
  );
};

export default Sidebar;
