const usersModel = require("./users.model");

module.exports = {
  Mutation: {
    signInUser: (_, args) => {
      return usersModel.signInUser(args.userId, args.device);
    },
    updatePlayableFlag: (_, args) => {
      return usersModel.updatePlayableFlag(args.userId, args.device, args.flag);
    },
    deleteDevice: (_, args) => {
      return usersModel.deleteDevice(args.userId, args.device);
    },
  },
  Query: {
    fetchUser: (_, args) => {
      return usersModel.fetchUser(args.userId);
    },
    fetchDevices: (_, args) => {
      return usersModel.fetchDevices(args.userId);
    },
  },
};
