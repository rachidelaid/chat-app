import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center flex-1">
      <h1 className="text-2xl font-bold">React Chat App</h1>
      <button
        onClick={handleLogin}
        className="bg-bg-300 flex items-center gap-2 px-4 py-1 w-fit rounded border-slate-200 border"
      >
        <img src="/google.svg" alt="google icon" className="w-4 h-4" />
        Login With Google
      </button>
    </div>
  );
};

export default Login;
