import React, { useRef, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  /* 선택된 파일 값을 제거하기위해 input값과 연결 */
  const attachmentPhoto = useRef();

  const onSubmit = async (event) => {
    if (nweet === '') {
      return;
    }
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment) {
      /* storageService.ref() = root reference 생성 */
      /* .child() = 인자값이 파일이름이자 경로, /를 추가하면 폴더생성 아니면 root에 생성 */
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${attachmentName}`);
      /* putString의 포맷은 'base64','base64url','data_url' 이 셋으로 정해져 있다 */
      const response = await attachmentRef.putString(attachment, 'data_url');
      /* attachment를 저장하고 난뒤 결과물의 다운로드 url을 받는다 */
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const addNweet = {
      text: nweet,
      createAt: new Date().toLocaleString(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    /* 컬렉션 이름을 정해서 저장 */
    await dbService.collection('nweets').add(addNweet);
    setNweet('');
    attachmentPhoto.current.value = null;
    setAttachment('');
    setAttachmentName('');
  };

  const onChange = (event) => {
    /* event.target은 html을 나타냄 */
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    /* FileReader()는 유저의 컴퓨터에 저장되어있는 파일을 읽어드리는 클래스 */
    const fileReader = new FileReader();
    /* 업로드한 파일을 url로 변환해서 읽어드림 */
    fileReader.readAsDataURL(theFile);
    /* 파일읽기가 끝나면 onloadend함수의 이벤트가 발생 */
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentName(attachmentPhoto.current.value.split('\\')[2]);
      setAttachment(result);
    };
  };

  const onClearAttachment = () => {
    setAttachment('');
    attachmentPhoto.current.value = null;
  };
  return (
    <form onSubmit={onSubmit} className='factoryForm'>
      <div className='factoryInput__container'>
        <input
          className='factoryInput__input'
          onChange={onChange}
          value={nweet}
          type={'text'}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='&rarr;' className='factoryInput__arrow' />
      </div>
      <label htmlFor='attach-file' className='factoryInput__label'>
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        ref={attachmentPhoto}
        id='attach-file'
        type='file'
        accept='image/*'
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className='factoryForm__attachment'>
          <img
            src={attachment}
            alt={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className='factoryForm__clear' onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
