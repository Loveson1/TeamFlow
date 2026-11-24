import { LuEyeClosed, LuEyeOff } from "react-icons/lu";
import teamflow from "../assets/images/teamflow.png";

export default function SignUp() {
  return (
    <div>
      <div>
        <h1>TeamFlow</h1>
        <h2>Sign up</h2>
        <button>Continue with Google</button>
        <form action="">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            placeholder="Enter your personal or work email..."
            name="email"
            type="text"
            className="border-secondaryText border rounded p-1.5 "
          />
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            placeholder="Enter your password..."
            name="password"
            type="text"
            className="border-secondaryText border rounded p-1.5 "
          />
          <LuEyeClosed></LuEyeClosed> : <LuEyeOff></LuEyeOff>
          <button type="submit">Sign up with Email</button>
        </form>

        <p>Already signed up? Go to login </p>
      </div>
      <div>
        <img src="teamflow" alt="teamflow" />
      </div>
    </div>
  );
}
