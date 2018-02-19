'use strict';

module.exports = Franz => {
  function getMessages() {
    const roomList = document.getElementById('_roomListItems').getElementsByClassName('roomListItem');
    const unreadRooms = Array.prototype.filter.call(roomList, element => element.getElementsByClassName('_unreadBadge').length);

    const unreadCounts = Array.prototype.reduce.call(unreadRooms, (acc, room) => {
      let count = 0;
      const isGroup = room.getElementsByClassName('avatarGroup').length;

      const unreadBadge = room.getElementsByClassName('_unreadBadge');
      if (unreadBadge.length > 0) {
        count = parseInt(unreadBadge[0].innerText, 10);
      }

      if (isGroup) {
        const hasMention = room.getElementsByClassName('roomListBadges__unreadBadge--hasMemtion').length
        if (hasMention) {
          acc.directMessages += 1;
        }
        acc.groupMessage += count;
      } else {
        acc.directMessages += count;
      }
      return acc;
    }, { directMessages: 0, groupMessage: 0 });

    const { directMessages, groupMessage } = unreadCounts
    Franz.setBadge(directMessages, directMessages + groupMessage)
  }

  Franz.loop(getMessages);
};
