import React from 'react';
import logo from '../logo.svg';
import Navbar from '../components/Navbar';
import BeatmapList from '../components/Beatmaps/BeatmapList';
import ManualUpdateForm from '../components/Beatmaps/manualUpdateForm';

export default function MainPage() {
  const [beatmaps, setBeatmaps] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/beatmaps')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error)
        setBeatmaps(data)});
  }, []);

  return (
    <div>
      <Navbar/>
      <BeatmapList beatmaps={beatmaps} />
      <ManualUpdateForm/>
    </div>
  );
}