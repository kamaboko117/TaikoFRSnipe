import React from "react";
import { Mapset } from "../../types/api";

interface Props {
  mapset: Mapset;
  onClick: () => void;
}

export default function MapsetItem({ mapset, onClick }: Props) {
  const onAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/beatmap/${mapset.id}`);
    }
  };

  return (
    <div className="mapset-card" onClick={onClick} onMouseDown={onAuxClick}>
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
    </div>
  );
}
