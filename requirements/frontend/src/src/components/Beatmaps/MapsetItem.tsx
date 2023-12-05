import React from "react";
import { Mapset } from "../../types/api";
import { Link } from "react-router-dom";

interface Props {
  mapset: Mapset;
}

export default function MapsetItem({ mapset }: Props) {
  return (
    <Link className="mapset-card" to={`/Beatmap/${mapset.beatmaps[0].id}`}>
      <div className="mapset-card-cover-header">
        <div
          className="mapset-card-cover"
          style={{
            backgroundImage: `url(https://assets.ppy.sh/beatmaps/${mapset.id}/covers/cover.jpg)`,
          }}
        />
      </div>
      <div className="mapset-card-info">
        <span className="mapset-card-info__title">
          {mapset.artist} - {mapset.song}
        </span>
        <span className="mapset-card-info__mapper">
          Mapped by {mapset.beatmaps[0].mapper}
        </span>
      </div>
    </Link>
  );
}
