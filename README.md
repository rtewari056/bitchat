<div align="center">

<!-- Title: -->
  <a href="https://bitchat.rohittewari.live" target="_blank">
    <img src="https://user-images.githubusercontent.com/75976169/202110105-88e5106c-2c4b-4314-9286-d1aae4541715.png" height="150" alt="Logo with shadow">
  </a>

  <!-- <a href="https://bitchat.rohittewari.live" target="_blank">
    <img src="https://user-images.githubusercontent.com/75976169/202110425-565c3278-4e8e-4754-b511-38be8ef23273.png" height="150" alt="Logo without shadow">
  </a> -->

<!-- Short description: -->
<h2>Real-time chat application powered by socket.io</h2>

<!-- Labels: -->
  <div>
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=102" height="20">
  <a href="https://bitchat.rohittewari.live" target="_blank">
    <img src="https://img.shields.io/website-up-down-green-red/https/bitchat.rohittewari.live.svg" height="20" alt="Website up">
  </a>
  <img src="https://img.shields.io/github/repo-size/rtewari056/bitchat.svg?label=Repo%20size" height="20" alt="Repo size">
  <img src="https://img.shields.io/github/languages/top/rtewari056/bitchat" height="20" alt="GitHub top language">
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/rtewari056/bitchat" height="20" alt="MIT License">
  </a>
  </div>

</div>

## 🚀 Demo

This application is deployed on DigitalOcean. Please check it out :smile: [here](https://bitchat.rohittewari.live).

![bitchat](https://user-images.githubusercontent.com/75976169/202241510-bb0dc077-11c2-4a22-9443-b241ecfca77c.gif)

## 🖥️ Tech Stack

**Frontend:**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp;
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![Chakra UI](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)&nbsp;

**Backend:**

![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
![HTML5](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)&nbsp;
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)&nbsp;

**Database:**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;

**Deployed On:**

[![DigitalOcean](https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white)](https://bitchat.rohittewari.live)

## ⚡️ Features

- [x] Real time communication is supported using [Socket.io](https://socket.io/)
- [x] Fully Responsive UI
- [x] User authentication using email with Login as well as Logout feature.
- [x] Passwords are encrypted.
- [x] Toast notifications for user actions.
- [x] Users can create group chat.
- [x] Typing Indicators while other user typing something.

## 📁 Project structure
```terminal
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── animations/
│   │   │   └── typing.json
│   │   ├── components/
│   │   │   ├── Authentication/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── UserAvatar/
│   │   │   │   ├── UserBadgeItem.jsx
│   │   │   │   └── UserListItem.jsx
│   │   │   ├── miscellaneous/
│   │   │   │   ├── GroupChatModal.jsx
│   │   │   │   ├── ProfileModal.jsx
│   │   │   │   ├── SideDrawer.jsx
│   │   │   │   └── UpdateGroupChatModal.jsx
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatLoading.jsx
│   │   │   ├── MyChats.jsx
│   │   │   ├── ScrollableChat.jsx
│   │   │   ├── SingleChat.jsx
│   │   │   └── index.js
│   │   ├── config/
│   │   │   └── ChatLogics.js
│   │   ├── context/
│   │   │   └── ChatProvider.js
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Home.jsx
│   │   │   └── index.js
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── config/
│   ├── connectToMongoDb.js
│   ├── generateHashedPassword.js
│   ├── generateToken.js
│   ├── index.js
│   └── verifyPassword.js
├── controllers/
│   ├── chatControllers.js
│   ├── index.js
│   ├── messageControllers.js
│   └── userControllers.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── index.js
├── models/
│   ├── Chat.js
│   ├── Message.js
│   ├── User.js
│   └── index.js
├── routes/
│   ├── chatRoutes.js
│   ├── index.js
│   ├── messageRoutes.js
│   └── userRoutes.js
├── .env.example
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## 📖 Prerequisites

In order to run the project you need `node>=16` and `npm>=8` installed on your machine.

## 🚩 Getting Started

### 1. Clone the `bitchat` repository:

```bash
git clone https://github.com/rtewari056/bitchat.git
```

### 2. Navigate into repo:
```bash
cd bitchat
```

### 3. Rename `.env.example` into `.env` and put all creadentials:

```bash
PORT=5000
MONGO_URI="YOUR_MONGO_CONNECTION_URL"
JWT_SECRET="YOUR_JWT_SECRET"
JWT_EXPIRE=2d
NODE_ENV=development # Change to "production" when deploying
```

### 4. Install package dependencies:

```bash
npm install # Server dependencies
cd client
npm install # Client dependencies
```

### 4. Run project:
In the `root` directory, open two terminal sessions and run both commands separately:

```bash
npm run client
npm run server
```

### 5. Open your browser and go to `http://localhost:3000`

## 👤 Developer

[Rohit Tewari](https://github.com/rtewari056)

## 📬 Contact

If you want to contact me, you can reach me through below handles.

<a href="https://linkedin.com/in/rtewari056" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="mailto:rtewari056@gmail.com"><img  alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
<a href="https://twitter.com/rtewari056" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"/></a>

## 📃 License

bitchat is licensed under the <a href="./LICENSE">MIT License</a>.

### Show your support by 🌟 the project
