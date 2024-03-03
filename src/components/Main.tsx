import Chat from "./Chat";
import Typing from "./Typing";

interface Chat {
  timestamp: number;
  photoURL: string;
  displayName: string;
  content: string;
}

const Main = ({ typing, chat = [] }: { typing: boolean; chat?: Chat[] }) => {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {chat.map((sec) => (
        <Chat
          key={sec.timestamp}
          image={sec.photoURL}
          name={sec.displayName}
          time={sec.timestamp}
          content={sec.content}
        />
      ))}

      {typing && <Typing className="mt-auto mx-auto" />}
    </div>
  );
};

export default Main;
