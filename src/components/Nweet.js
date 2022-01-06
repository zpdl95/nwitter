import React from "react";

const Nweet = ({ nweetObj, isOwner }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Edit Nweet</button>
        <button>Delete Nweet</button>
      </>
    )}
  </div>
);
export default Nweet;
