import "./Home.css";
import StarField from "../../components/common/StarField";
import HomeHero from "../../components/home/HomeHero/HomeHero";
import HomeCards from "../../components/home/HomeCards/HomeCards";

export default function Home() {
  return (
    <div className="home-page">
      <StarField>
        <div className="home-layout">
          <HomeHero />
          <HomeCards />
        </div>
      </StarField>
    </div>
  );
}
