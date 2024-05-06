'use client'
import getTokenService from '../../../services/chat/getTokenService';
import { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = process.env.NEXT_PUBLIC_CHAT_KEY;



const MyChat = ({ token, userId }) => {
  const filters = { members: { $in: [userId] }, type: 'messaging' };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },
  });

  if (!client) return <div>Loading...</div>;

  const channel = client.channel('messaging', {
    members: [userId, 'samuel'],
  });

  return (
    <Chat client={client}>
      <ChannelList sort={sort} filters={filters} options={options} />
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

const wrapperChat = () => {
  const [token, useToken] = useState(null)
  const userId = 'samuel235'

  useEffect(() => {
    getTokenService(userId).then(e => {
      console.log(">>>> e", e)
      useToken(e);
    })
  }, [])

  return <>
    {token && <MyChat token={token} userId={userId}></MyChat>}
  </>
}

export default wrapperChat