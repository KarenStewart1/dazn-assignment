const { ApolloError } = require("apollo-server-errors");
const axios = require("axios");

const userDatabase = [
  {
    userId: "ad239f2f-3657-462c-8efa-798e4e810fd2",
    registeredDevices: [],
    // MaxDevices: >0
  },

  {
    userId: "c0b8584c-97e3-4561-b8fc-58797b1f4c6d",
    registeredDevices: [{ name: "iphone", playable: true }],
    // MaxDevices: 2
  },

  {
    userId: "aa3dde7c-98ca-446e-aa70-315ffff14e4f",
    registeredDevices: [{ name: "iphone", playable: true }],
    // MaxDevices: 1
  },

  {
    userId: "9b796236-ad47-4f53-9009-09782384f969",
    registeredDevices: [
      { name: "iphone", playable: true },
      { name: "android", playable: true },
      { name: "tv", playable: true },
      { name: "windowsLaptop", playable: false },
      { name: "macbook", playable: false },
    ],
    // MaxDevices: 3
  },

  {
    userId: "b360af9a-5ff9-48d0-86a9-d26ef77de8e2",
    registeredDevices: [{ name: "googlePhone", playable: true }],
    // MaxDevices: 2
  },

  {
    userId: "cb291ca0-cd37-42f8-af01-2e171de6be60",
    registeredDevices: [
      { name: "windowsPhone", playable: true },
      { name: "googleTv", playable: true },
    ],
    // MaxDevices: 3
  },
];

function fetchUser(userId) {
  const userInfo = userDatabase.filter((user) => user.userId === userId);

  return userInfo[0];
}

function fetchDevices(userId) {
  const user = fetchUser(userId);
  const devices = user.registeredDevices;

  return devices;
}

async function signInUser(userId, device) {
  const user = fetchUser(userId);

  if (isDeviceRegistered(user.registeredDevices, device) === false) {
    const maxReached = await isMaxDevicesReached(userId);
    registerDevice(userId, device, maxReached ? false : true);

    const userAccount = fetchUser(userId);

    return userAccount;
  } else {
    updatePlayableFlag(userId, device, true);

    const userAccount = fetchUser(userId);

    return userAccount;
  }
}

async function fetchMaxDevices(userId) {
  const URL =
    "https://growth-engineering-nodejs-home-assessement-dev.s3.eu-central-1.amazonaws.com/entitlements.json";
  const { data } = await axios.get(URL);
  const user = data.filter((user) => user.userId === userId);
  const maxDevices = user[0].entitlements.devices.max_devices;

  return maxDevices;
}

function isDeviceRegistered(userDevices, device) {
  const matchedDevice = userDevices.filter((dev) => dev.name === device);

  if (matchedDevice.length > 0) {
    return true;
  } else {
    return false;
  }
}

function registerDevice(userId, device, flag) {
  const newDevice = { name: device, playable: flag };

  const userIndex = userDatabase.findIndex((obj) => obj.userId === userId);

  userDatabase[userIndex].registeredDevices.push(newDevice);

  return userDatabase[userIndex].registeredDevices;
}

async function isMaxDevicesReached(userId) {
  const user = fetchUser(userId);
  const currentPlayableDevices = user.registeredDevices.filter(
    (dev) => dev.playable === true
  );

  const maxDevices = await fetchMaxDevices(userId);

  if (currentPlayableDevices.length < maxDevices) {
    return false;
  } else {
    return true;
  }
}

async function updatePlayableFlag(userId, device, flag) {
  const isMaxReached = await isMaxDevicesReached(userId);
  const userIndex = userDatabase.findIndex((obj) => obj.userId === userId);
  const deviceIndex = userDatabase[userIndex].registeredDevices.findIndex(
    (obj) => obj.name === device
  );

  if (
    userDatabase[userIndex].registeredDevices[deviceIndex].playable === flag
  ) {
    return;
  }
  if (flag && isMaxReached) {
    throw new ApolloError(
      "Maximum limit of playable devices reached",
      "MAX_LIMIT_PLAYABLE_DEVICES_REACHED"
    );
  } else {
    userDatabase[userIndex].registeredDevices[deviceIndex].playable = flag;
  }
  return userDatabase[userIndex].registeredDevices[deviceIndex];
}

function deleteDevice(userId, device) {
  const userIndex = userDatabase.findIndex((obj) => obj.userId === userId);
  const deviceIndex = userDatabase[userIndex].registeredDevices.findIndex(
    (obj) => obj.name === device
  );

  userDatabase[userIndex].registeredDevices.splice(deviceIndex, 1);

  return userDatabase[userIndex].registeredDevices;
}

module.exports = {
  fetchUser,
  fetchDevices,
  signInUser,
  updatePlayableFlag,
  deleteDevice,
};
