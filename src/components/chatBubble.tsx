import React from 'react';
import { useStoreState } from 'easy-peasy';
import HumanTime from 'react-human-time';
import { checkmarkOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface CustomInputProps {
  data: object,
  chatId: any,
  setShowAlertDelete: () => void,
}

const ChatBubble: React.FC<CustomInputProps> = (props: any) => {
  const { data, chatId, setShowAlertDelete } = props;
  const myUser = useStoreState(state => state.user.data);
  const includes = (data: any, compare: any) => {
    return data.filter((item: any) => item == compare).length;
  }
  
  return (
    <React.Fragment>
    { (!data.deleted || data.deleted.length === 2 || !includes(data.deleted, myUser.id)) && data.deletedBy != myUser.id &&
      <div className={ 
          `bubble-chat 
          ${ data.owner == myUser.id ? 'bubble-chat--mine' : '' }
          ${ data.deleted && includes(data.deleted, myUser.id) ? 'bubble-chat--deleted' : '' }` 
        } 
        key={`message-${data.index}`}
        onClick={() => setShowAlertDelete({ show: true, message: { data, chatId } }) }>
        <p>{data.message}</p>
        <span className="content-meta-data"> 
          <HumanTime time={data.date} />
          <IonIcon icon={ !data.read ? checkmarkOutline : checkmarkDoneOutline } />
        </span>
      </div>
    }
    </React.Fragment>
  )
}

export default React.memo((props: any) => <ChatBubble {...props} />);