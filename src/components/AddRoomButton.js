import { useState } from "react";
import { useRouter } from "next/router";

function AddRoomButton() {
  const router = useRouter();

  const [dorm, setDorm] = useState("");
  const [room, setRoom] = useState(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  function addRoom() {
    (async () => {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          id: room,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log(data);
      }
    })();
  }

  const handleAddRoom = () => {
    addRoom();
    router.push(`/dorms/${dorm}/${room}/review`);
    // eslint-disable-next-line no-console
    console.log(`New room: ${room}`);
  };

  return (
    <div>
      <button type="button" className="dropdown-btn" onClick={toggleDropdown}>
        Add Room
      </button>

      {isDropdownVisible && (
        <>
          <div className="dropdown-content">
            <label>
              Dorm:
              <input
                type="text"
                value={dorm}
                onChange={(e) => setDorm(e.target.value)}
              />
            </label>
            <label>
              Room:{" "}
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </label>
          </div>
          <button type="button" onClick={handleAddRoom}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}

export default AddRoomButton;
