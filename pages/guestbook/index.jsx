import React from "react";
import { supabase } from "/lib/supabaseClient.js";
import Body from "/components/Body";
import { BsGithub } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react";
import { GrSend } from "react-icons/gr";

function GuestBookPage({ guestbook }) {
  const { data: session } = useSession();
  console.log(session);
  const messageinput = React.useRef();
  const [message, setmessage] = React.useState(null);
  const [username, setusername] = React.useState("");
  const [date, setdate] = React.useState(null);
  const [messagenull, setmessagenull] = React.useState(false);
  const [loading, setloading] = React.useState(true);
  const [guestbookdata, setguestbookdata] = React.useState(null);
  const [guestbookerrors, setguestbookerrors] = React.useState(null);
  const [useremail, setuseremail] = React.useState(null);
  const [guestbooktime, setguestbooktime] = React.useState(null);

  function getdate() {
    console.log(new Date().toISOString().toLocaleString().slice(0, 10));
    setdate(new Date().toISOString().toLocaleString().slice(0, 10));
  }
  const fetchguestbook = async () => {
    setloading(true);
    const { data, error } = await supabase.from("guestbook").select();
    if (error) {
      alert("error to fetch guestbook data");
      setguestbookerrors(error);
    }
    if (data) {
      setguestbookdata(data);
    }
  };
  React.useState(() => {
    fetchguestbook();
  }, []);
  const uploaddata = async (e) => {
    let { data } = await supabase.from("guestbook").insert([
      {
        message,
        username,
        useremail,
        date: new Date().toISOString().toLocaleString().slice(0, 10),
        time: getCurrentTime(),
      },
    ]);
    fetchguestbook();
  };
  const removedata = async (removeid) => {
    const { data } = await supabase
      .from("guestbook")
      .delete()
      .eq("id", removeid);
    fetchguestbook();
  };
  React.useEffect(() => {
    session && setusername(session.user.name);
    session && setuseremail(session.user.email);
  }, [session]);
  function getCurrentTime() {
    var date = new Date();
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hours + ":" + minutes;
  }
  return (
    <Body title="Guestbook">
      <div className="mb-6">
        <h1 className="font-extrabold text-6xl tracking-tight">Guestbook</h1>
        <p className="text-md mt-1">
          Leave a message for me and other visitors here!
        </p>
      </div>
      <div
        className={`p-3 drop-shadow-md dark:bg-neutral-800 bg-neutral-200 rounded-lg mb-5 ${
          session ? "hidden" : "block"
        }`}
      >
        <p className="text-lg mb-1 font-bold">Sign in</p>
        <div className="flex">
          <button
            onClick={() => signIn("github")}
            className="bg-[#2f3338] hover:bg-[#4f5257] items-center flex font-bold text-lg text-white dark:text-white px-2 py-2 rounded-lg duration-100"
          >
            <BsGithub />
            &thinsp;Github
          </button>
        </div>
      </div>
      <div
        className={`px-3 pb-2 pt-2 dark:bg-neutral-800 bg-neutral-200 drop-shadow-lg rounded-lg block mb-5 ${
          session ? "block" : "hidden"
        }`}
      >
        <div className="mb-2 flex">
          <p className="text-md font-bold">{session && session.user.name}</p>
          &nbsp;
          <p className="text-md">({session && session.user.email})</p>
        </div>
        <div className="block">
          <input
            ref={messageinput}
            onFocus={() => setmessagenull(false)}
            onChange={(x) => setmessage(x.target.value)}
            placeholder="Your message..."
            type="text"
            className="px-2 w-full text-lg rounded-lg h-10 dark:bg-neutral-900 bg-neutral-100"
          ></input>

          <div className="flex">
            <button
              onClick={() => {
                !message ? setmessagenull(true) : setmessagenull(false);
                getCurrentTime();
                session && setusername(session.user.name);
                getdate();
                message && uploaddata();
                messageinput.current.value = "";
                setmessage(null);
                setguestbooktime(null);

                // getServerSideProps();
              }}
              className="py-1 mt-2 dark:bg-neutral-900 h-10 rounded-lg w-full hover:drop-shadow-md duration-100 bg-neutral-100"
            >
              Send It
            </button>
            <button
              onClick={() => signOut("github")}
              className="py-1 mt-2 ml-2 dark:bg-neutral-900 h-10 rounded-lg w-[130px] hover:drop-shadow-md duration-100 bg-neutral-100"
            >
              Sign out
            </button>
          </div>
        </div>
        <p
          className={`text-red-600 text-md font-bold  ${
            messagenull ? (!message ? "block" : "hidden") : "hidden"
          }`}
        >
          Message is empty
        </p>
      </div>
      <ul className="">
        {guestbookdata &&
          guestbookdata
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .map((guestbook) => (
              <li
                key={guestbook.id}
                className="hover:bg-neutral-200 hover:dark:bg-neutral-800 hover:drop-shadow-md duration-100 rounded-lg p-3 my-2"
              >
                <p className="">{guestbook.message}</p>
                <div className="flex dark:text-zinc-500 text-zinc-400">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {guestbook.username}
                  </p>
                  <p className="mx-1 text-zinc-300 dark:text-neutral-700">/</p>
                  <div className="flex">
                    <p>{guestbook.date}</p>&thinsp;<p>at</p>&thinsp;
                    <p>{guestbook.time}</p>
                  </div>
                  <div
                    className={`${
                      session
                        ? session.user.email === guestbook.useremail
                          ? "flex"
                          : "hidden"
                        : "hidden"
                    }`}
                  >
                    <p className="mx-1 text-zinc-300 dark:text-neutral-700">
                      /
                    </p>
                    <button
                      className="text-red-600 hover:text-red-500 duration-100"
                      onClick={() => {
                        removedata(guestbook.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </Body>
  );
}
// export async function getServerSideProps() {
//   let { data } = await supabase.from("guestbook").select();
//   return {
//     props: {
//       guestbook: data,
//     },
//   };
// }

export default GuestBookPage;
