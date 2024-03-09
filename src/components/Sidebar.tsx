import {
  XMarkIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { User, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Sidebar = ({
  user,
  users = [],
  open = false,
  setOpen,
}: {
  open?: boolean;
  user: User;
  users?: User[];
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`flex flex-col gap-3 bg-bg-100 transition-all h-full overflow-hidden md:w-60 absolute md:relative top-0 left-0 ${
        open ? "w-4/5" : "w-0"
      }`}
    >
      <div className="p-2 flex items-center gap-1 border-b border-bg-300">
        <XMarkIcon
          className="w-5 h-5 cursor-pointer md:hidden"
          onClick={() => setOpen && setOpen(false)}
        />
        <p>Group Users</p>
      </div>

      {users?.map((usr) => (
        <div
          className={`flex gap-2 items-center text-gray-400 border-2 border-bg-100 p-2 ${
            usr.uid === user.uid ? "bg-bg-200" : ""
          }`}
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

      <div className="border-t text-gray-500 font-semibold text-sm border-bg-300 p-3 mt-auto flex items-center gap-2">
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
