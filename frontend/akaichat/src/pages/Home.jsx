import React from 'react'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Akai Chat: Bridging Conversations!
            </h1>
            <p className="py-6">
              Akai Chat is a cutting-edge chat application designed to
              revolutionize the way people communicate. With a user-friendly
              interface and advanced features, Akai Chat aims to make online
              conversations more engaging and accessible. Whether you're
              connecting with friends, collaborating on projects, or exploring
              new communities, Akai Chat is the go-to platform for seamless and
              meaningful interactions.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signin")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
