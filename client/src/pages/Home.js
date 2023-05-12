import React from "react";
import Hero from "../components/Hero";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Footer from "../components/Footer"

function Home(props) {
  return (
    <div>
      <Hero />
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half"><Login /></div>
            <div className="column is-half"><Signup /></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
