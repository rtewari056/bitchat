const { registerUser, authUser, allUsers } = require("./userControllers");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
} = require("./chatControllers");

module.exports = {
  registerUser,
  authUser,
  allUsers,
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};
