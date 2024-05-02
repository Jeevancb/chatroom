import React,{useState, useEffect,useContext} from 'react';
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import "@fontsource/inter";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { WebSocketContext } from "../contexts/WebSocketProvider";
import { useNavigate } from "react-router-dom";



function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
     <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  
  );
}

function SignIn() {
  const { setrn,setusername} = useContext(WebSocketContext);
  const [room_name, setroom_name] = useState("");
  
  const [name, setname] = useState("");
  const navigate = useNavigate();



  const joinroom= ()=>{
    setrn(room_name)
    setusername(name)
   
    navigate("/chat");
    // navigate("/chat", { state: { param1: room_name, param2:username } });
    }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Join room Now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={joinroom} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Roomname</span>
              </label>
              <input
                type="text"
                placeholder="enter your roomname.."
                className="input input-bordered"
                value={room_name}
                onChange={e => setroom_name(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="enter your name.."
                className="input input-bordered"
                value={name}
                onChange={e => setname(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  forgot username?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Join room</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn
