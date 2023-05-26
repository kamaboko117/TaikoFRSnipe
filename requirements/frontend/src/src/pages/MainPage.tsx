import React from "react";
import Navbar from "../components/Navbar";
import BeatmapList from "../components/Beatmaps/BeatmapList";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import { Snipe } from "../types/api";

export default function MainPage() {
  const [snipes, setSnipes] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/snipes/")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          setSnipes(data);
        }
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        {/* <BeatmapList beatmaps={beatmaps} /> */}
        <SnipeList snipes={snipes} />
        <ManualUpdateForm />
      </div>
    </div>
  );
}
