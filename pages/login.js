import { useEffect } from "react";
import { supabase } from "/lib/supabaseClient.js";
export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth(
    {
      provider: "github",
    },
    { redirectTo: "http://localhost:3000/guestbook" }
  );
  return data;
}
const Login = () => {
  signInWithGitHub();

  return <p className="text-md">Login with Github ...</p>;
};

export default Login;
