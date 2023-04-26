import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  /* 화면이동에 사용하는 기록 객체를 사용할 수 있는 hook */
  const history = useHistory();
  /* ?? = ES11에서 도입된 null 병합 연산자 */
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ?? 'User'
  );
  const onLogOutClick = () => {
    /* firebase의 로그아웃 */
    authService.signOut();
    /* home으로 보내는 방법 */
    history.push('/');
  };

  const getMyNweets = async () => {
    /* where을 사용해서 색인을 하려면 firebase의 firestorage에 가서 색인설정을 해줘야 한다 */
    await dbService
      .collection('nweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createAt', 'desc')
      .get();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      /* updateProfile()은 displayName과 photoURL만 변경할 수 있다. */
      /* 이 기능을 사용해서 profile을 변경시켜도 userObj의 변경이벤트를
      얻지 못하면 새로고침하지 않는 이상 변경된 이름이 출력되지 않는다 */
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      setNewDisplayName('');
      refreshUser();
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='profileForm'>
        <input
          autoFocus
          onChange={onChange}
          type='text'
          placeholder='Display name'
          value={newDisplayName}
          className='formInput'
        />
        <input
          type='submit'
          value='Update Profile'
          className='formBtn'
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
