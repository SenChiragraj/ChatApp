import User from "../data/UserModel.js";

export const addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    // Find the friend by id
    let friend = await User.findById(friendId);
    if (!friend || friendId == req.user._id) return res.status(404).json({ message: 'Friend not found' });

    // Update the current user's friend array
    req.user.friends.push({ friendID: friendId, chat: [] });

    // Update the friend's friend array
    console.log(friend);
    console.log(friendId, req.user._id);
    friend.friends.push({ friendID: req.user._id, chat: [] });

    // Save changes
    await req.user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
