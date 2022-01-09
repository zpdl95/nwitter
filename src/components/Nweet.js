import { dbService, storageService } from "fbase";
import React from "react";
import { useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("확실하게 삭제할 것입니까?");
    if (ok) {
      /* doc() 문서 경로 작성 */
      dbService.doc(`nweets/${nweetObj.id}`).delete();
      if (nweetObj.attachmentUrl) {
        /* 해댱 url로 부터 ref를 찾아 삭제 */
        storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              autoFocus
              type={"text"}
              placeholder="What is your nweet?"
              value={newNweet}
              required
              onChange={onChange}
              className="formInput"
            />
            <input type={"submit"} value={"Update Nweet"} className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Nweet;
