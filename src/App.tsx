import TravelMap from "./components/TravelMap";
import locations from "./data/locations";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header
        style={{
          padding: "12px 20px",
          background: "#2c3e50",
          color: "#ecf0f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.4rem" }}>
          Year of Wander — Travel Map
        </h1>
        <a
          href="https://yearofwander.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#ecf0f1" }}
        >
          Blog
        </a>
      </header>
      <TravelMap locations={locations} />
    </div>
  );
}
