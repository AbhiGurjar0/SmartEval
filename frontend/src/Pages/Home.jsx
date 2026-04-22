import React from "react";
import NoLoginHeader from "../components/Home/Headers/NoLoginHeader";
import LoginHeader from "../components/Home/Headers/LoginHeader";
import HeroSection from "../components/Home/LandingPage";
import Features from "../components/Home/Features/Features";
import FooterCTASection from "../components/Footer/FooterCTASection";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Steps from "../components/Home/Steps";
import Loader from "../components/Dashboards/Shared/Loader";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
 
  return (
  <div className="relative z-10">
    {user ? <LoginHeader /> : <NoLoginHeader />}
    {loading ? (
      <Loader />
    ) : (
      <>
        <HeroSection />
        <Features />
        <Steps />
        <FooterCTASection />
      </>
    )}
  </div>
);
};

export default Home;
