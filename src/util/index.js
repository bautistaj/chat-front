const cleanMessages = (messages, currentUser) => {
  const cleanMessages = messages.filter((message) => {
    if (message.userId === currentUser.id) {
      message.messageStyle = 'message-self';
    }else{
      message.messageStyle = 'message';
    }

    return message;
  });
  return cleanMessages;
};

module.exports = {
  'cleanMessages': cleanMessages,
}