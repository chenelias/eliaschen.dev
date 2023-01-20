import React from "react";
import { supabase } from "/lib/supabaseClient.js";
import Link from 'next/link'
import Body from "/components/Body";
import {signInWithGitHub} from '../login.js'
function GuestBookPage({ guestbook }) {
  function GithubAuth() {
    supabase.auth.signIn({
      provider: "github",
    });
  }
  React.useEffect(() => {}, []);
  return (
    <Body title="GuestBook">
      <div className="mb-6">
        <h1 className="font-extrabold text-6xl tracking-tight">Guestbook</h1>
        <p className="text-md mt-1">
          Leave a message for me and other visitors here!
        </p>
        <h1>{signInWithGitHub}</h1>
      </div>
      <div className="p-3 dark:bg-neutral-800 bg-neutral-200 drop-shadow-lg rounded-lg block mb-5">
        <div className="flex w-full">
          <Link href="/login">
            <button className="p-2 dark:bg-neutral-900 rounded-lg hover:drop-shadow-md duration-100 mt-3 bg-neutral-100">
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className="p-3 dark:bg-neutral-800 bg-neutral-200 drop-shadow-lg rounded-lg block">
        <textarea
          name=""
          id=""
          cols={10}
          rows={10}
          className="p-2 w-full text-lg rounded-lg h-[130px] dark:bg-neutral-900 bg-neutral-100"
        ></textarea>
        <div className="flex w-full">
          <button className="p-2 dark:bg-neutral-900 rounded-lg w-full hover:drop-shadow-md duration-100 mt-3 bg-neutral-100">
            Send It
          </button>
        </div>
      </div>
      <ul>
        {guestbook.map((guestbook) => (
          <div>
            <li key={guestbook.id}>{guestbook.username}</li>
            <p>{guestbook.message}</p>
          </div>
        ))}
      </ul>
    </Body>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("guestbook").select();
  return {
    props: {
      guestbook: data,
    },
  };
}
export default GuestBookPage;
