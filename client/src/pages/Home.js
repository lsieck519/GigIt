import React from "react";
import Hero from "../components/Hero";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Footer from "../components/Footer";

function Home(props) {
  return (
    <div>
      <div className="hero is-fullheight is-flex">
        <Hero />
      </div>
      <section className="section">
        <div className="container home-page mb-6">
          <div className="columns is-centered">
            <div className="column is-half is-flex is-justify-content-center">
              <Login />
            </div>
            <div className="column is-half is-flex is-justify-content-center">
              <Signup />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
