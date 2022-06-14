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
    userId: "aa3dde7c-98ca-446e-aa70-315ffff14e4f",
    registeredDevices: [
      { name: "iphone", playable: true },
      { name: "android", playable: true },
      { name: "tv", playable: true },
      { name: "windowsLaptop", playable: false },
      { name: "macbook", playable: false },
    ],
    // MaxDevices: 3 (let's say)
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
  // returns [Device]
  return;
}
function signInUser(userId, device) {
  // returns user
  return;
}
function updatePlayableFlag(userId, device, flag) {
  // returns one device
  return;
}
function deleteDevice(userId, device) {
  // returns [Device]
  return;
}

module.exports = {
  fetchUser,
  fetchDevices,
  signInUser,
  updatePlayableFlag,
  deleteDevice,
};
