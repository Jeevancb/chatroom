import React from 'react'

function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className=' flex flex-col' action="POST">
        <input className=" border-2 " type="text" placeholder="Username" />
        <br />
        <input className="border-2" type="password" placeholder="Password" />
        <button
          className=""
          onClick={() => alert("You clicked the login button!")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
