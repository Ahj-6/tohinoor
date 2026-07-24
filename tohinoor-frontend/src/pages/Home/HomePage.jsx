import "./Home.css";

import GalaxyBackground from "./components/GalaxyBackground/GalaxyBackground";
import HomeLogo from "./components/HomeLogo/HomeLogo";
import LoginButton from "./components/LoginButton/LoginButton";
import FeatureGrid from "./components/FeatureGrid/FeatureGrid";

export default function HomePage() {
  return (
    <div className="home-page">
      <GalaxyBackground />

      <HomeLogo />

      <LoginButton />

      <FeatureGrid />
    </div>
  );
}
