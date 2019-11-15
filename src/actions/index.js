export const setCurrentUser = (payload) => (
  {
    type: 'SET_CURRENT_USER',
    payload,
  }
);

export const setUsers = (payload) => (
  {
    type: 'SET_USERS',
    payload,
  }
);

export const setCurrentChatId = (payload) => (
  {
    type: 'SET_CURRENT_CHAT_ID',
    payload,
  }
);

export const setCurrentChats = (payload) => (
  {
    type: 'SET_CURRENT_CHATS',
    payload,
  }
);