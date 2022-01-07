import { dbService } from "fbase";
import React from "react";
import { useState } from "react/cjs/react.development";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("확실하게 삭제할 것입니까?");
    if (ok) {
      /* doc() 문서 경로 작성 */
      dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    /* doc() 문서 경로 작성 */
    /* firebase에서 해당 오브젝트의 text만 업데이트 시킴 */
    dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type={"text"}
              placeholder="What is your nweet?"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type={"submit"} value={"Update Nweet"} />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width={"100px"}
              height={"100px"}
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit Nweet</button>
              <button onClick={onDeleteClick}>Delete Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
