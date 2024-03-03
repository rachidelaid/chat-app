import { formatRelative } from "date-fns";

const Chat = ({
  image,
  name,
  time,
  content,
}: {
  image?: string;
  name: string;
  time: number;
  content: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-sm gap-2 text-gray-500">
        <img
          src={image ?? "/placeholder.png"}
          alt="user's avatar"
          className="w-5 h-5 rounded"
        />
        <span className="font-bold">{name}</span>
        <span className="text-xs">
          {formatRelative(new Date(time), new Date())}
        </span>
      </div>
      <p className="ml-7">{content}</p>
    </div>
  );
};

export default Chat;
