'use client'
import { getUserSelect } from '@/store/user/selectors';
import getTokenService from '../../../services/chat/getTokenService';
import { useEffect, useId, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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



const MyChat = ({ token, userId, hasChannelList = false, people = [] }) => {
  const filters = { members: { $in: [userId] }, type: 'messaging' };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },
  });

  if (!client) return <div>Loading...</div>;

  console.log("people =>", people)
  const channel = client.channel('messaging', {
    members: people,
  });

  return (
    <Chat client={client}>
      {hasChannelList && <ChannelList sort={sort} filters={filters} options={options} />}
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

const wrapperChat = ({ people }) => {
  const { userId, token } = useSelector(getUserSelect)
  const peopleFilter = useMemo(() => {
    const filter = people?.filter(e => e !== userId)
    return [...filter, userId]
  }, [people, userId])
  
  return <>
    {token && people && <MyChat token={token} userId={userId} people={peopleFilter} />}
  </>
}

export default wrapperChat