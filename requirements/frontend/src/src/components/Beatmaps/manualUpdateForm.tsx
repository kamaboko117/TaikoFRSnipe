import React from "react";

export default function ManualUpdateForm() {
  //handle the form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("beatmapId")?.valueOf();
    const id = parseInt(formData as string);
    if (id) {
      fetch("/api/beatmaps", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) console.log(data);
        });
    }
  }

  return (
    <div>
      <h1>Manual Update</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="beatmapId">Beatmap ID</label>
        <input type="text" name="beatmapId" id="beatmapId" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
