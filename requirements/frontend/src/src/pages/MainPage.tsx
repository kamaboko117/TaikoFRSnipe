import React from "react";
import Navbar from "../components/Navbar";
import BeatmapList from "../components/Beatmaps/BeatmapList";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";

export default function MainPage() {
  const [beatmaps, setBeatmaps] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/beatmaps")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setBeatmaps(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <BeatmapList beatmaps={beatmaps} />
        <ManualUpdateForm />
      </div>
    </div>
  );
}
