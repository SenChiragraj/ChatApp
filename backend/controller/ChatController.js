import User from "../data/UserModel.js";
import Group from "../data/GroupModel.js";

export const updatePersonalChat = async (req, res) => {
  const { friendID, message } = req.body;
  try {
    // Find the sender by id
    const sender = await User.findById(req.user._id);
    if (!sender) return res.status(404).json({ message: 'Sender not found' });

    // Find the receiver by id
    const receiver = await User.findById(friendID);
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    // Update sender's chat
    const senderFriendIndex = sender.friends.findIndex(friend => friend.friendID === friendID);
    if (senderFriendIndex === -1) return res.status(404).json({ message: 'Friend not found in sender\'s friends list' });
    sender.friends[senderFriendIndex].chat.push({ message: message, type: false });

    // Update receiver's chat
    const receiverFriendIndex = receiver.friends.findIndex(friend => friend.friendID.toString() === req.user._id.toString());
    if (receiverFriendIndex === -1) return res.status(404).json({ message: 'Sender not found in receiver\'s friends list' });
    receiver.friends[receiverFriendIndex].chat.push({ message: message, type: true });

    // Save changes
    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Chat updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGroupChat = async (req, res) => {
  const { groupID, message } = req.body;
  try {
    // Find the sender by id
    const sender = await User.findById(req.user._id);
    if (!sender) return res.status(404).json({ message: 'Sender not found' });

    // Find the group by id
    const group = await Group.findById(groupID);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Update chat for each member of the group
    for (const memberID of group.members) {
      const member = await User.findById(memberID);
      if (!member) return res.status(404).json({ message: `Member ${memberID} not found` });

      const messageType = member._id.toString() === sender._id.toString() ? false : true;

      const memberFriendIndex = member.friends.findIndex(friend => friend.friendID.toString() === groupID.toString());
      if (memberFriendIndex === -1) return res.status(404).json({ message: `Group ${groupID} not found in member ${memberID}'s friends list` });

      member.friends[memberFriendIndex].chat.push({ message: message, type: messageType });
      await member.save();
    }

    res.status(200).json({ message: 'Chat updated successfully for all group members' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

