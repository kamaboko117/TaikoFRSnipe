import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PlayerPage() {
  const id = parseInt(useParams().id as string);
  // const [user, setUser]

  React.useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
        }
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>UserPage</h1>
      </div>
    </div>
  );
}
