import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import Navbar from "../components/Navbar/Navbar";
import SnipeList from "../components/Snipes/SnipeList";
import { Snipe } from "../types/api";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function MainPage() {
  const [snipes, setSnipes] = useState<Snipe[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/snipes/latest/10`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
      })  
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Latest Taiko French Tops</h1>
        <SnipeList snipes={snipes} />
        <button className={"center"} onClick={() => navigate("/Snipes")}>
          View All
        </button>
        <ManualUpdateForm />
      </div>
    </div>
  );
}
