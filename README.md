# Realm Chat

## Overview
Realm Chat is a mobile chat application built using React Native. This user-friendly app provides a seamless chat interface and advanced features for effortlessly sharing images and location in real time. Data such as chat messages and images are stored in [Google Firebase](https://firebase.google.com/) (Firestore Databse and Storage). Chat UI is powered by [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat).

## Key Features
- **User Customization**: Users will be directed to a page where they can input their name and select a background color for the chat screen.
- **Chat Interface**: The page will present the ongoing conversation and feature a text input field where you can type your message, along with a submit button to send it.
- **Multimedia Support**: In the chat, users can share images and their location. The data is stored both online and offline for easy access.

## Dependencies
- React Native
- Expo
- Firebase (Firestore, Auth, Storage)
- Gifted Chat
- AsyncStorage

## Set Up the App
### Clone repository
Open your terminal and run the following.
```
git clone https://github.com/TheaWin/realm-chat.git
```
### Install Node.js, nvm, and npm
Check if you already have Node.js, nvm, and npm installed.
```
node -v
nvm -v
npm -v
```

If you don't have them installed, please follow this [guidance](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm) to get them set up.

### Get Expo
1. Install Expo Go from the relevant app store for your device (iOS or Android).
2. Head over to the [Expo Signup page](https://expo.dev/signup) and follow the instructions to create an account.
3. Once your account is created, log in to Expo from your browser and mobile app.
4. To log in to Expo account in the terminal, run `npx expo login` and follow the login process.
5. You can see the currently logged-in account by running `expo whoami`.

### Install Dependencies
1. Navigate to the cloned project in your terminal, so that you are in the root of the project.
2. Run `npm install` in the terminal while in the root folder of the project. This will automatically install all the required dependencies.

### Configure Firebase
1. Head to [Google Firebase](https://firebase.google.com/) and Sign In in the upper-right corner. Use your existing Google credentials to sign in and create a new Firebase account.
2. Welcome screen is now showing. Click on `Create a project` (or Add project if you’ve created Firebase projects before).
3. Give your project a name, it's up to you, e.g. `demo-chat` or anything you want.
4. Agree to the terms and continue.
5. Disable `Google Analytics` option and select `Create Project`.
6. In the left sidebar, select `Build` and `Firestore Database`.
7. Click `Create Database`, select the region from the Multi-region label that's closest to you.
8. On the next page, select `Start in production mode`. Hit `Next` and your new database should be automatically loaded.
9. On the database dashboard, click `Rules` and make sure the rule states `allow read, write: if true;` instead of the default `false`. Click Publish when updated.
10. Again, in the left sidebar, select `Build` and `Storage`.
11. Click `Get started`. A popup will open that asks you to set your cloud storage. Keep everything on default and press `Next`, then `Done`.
12. On the storage dashboard, click `Rules` and make sure the rule states `allow read, write: if true;` instead of the default `false`. Click Publish when updated.
13. Once again, in the left sidebar, select `Build` and `Authentication`.
14. Click on the `Sign-in method` tab and select `Anonymous`.
15. Once clicked, a form will appear where you can toggle `Enable` on for anonymous sign-ins. Then, click `Save`, and you’ll be presented with a table showing a confirmation that anonymous sign-in has been enabled (it should say “Enabled” in the Status column).

### Add Firestore Configuration to Your Project
1. In the Firestore project in your browser, open you "Project Settings" (gear icon).
2. Select the `General` tab and find a section called `Your Apps`. 
3. Click the `Firestore for Web` button - it is the </> icon. Clicking this button will open a new screen asking you to register your web app, which will connect to the Firestore database you just created.
4. Fill in a name for your app, e.g., demo_chat, and click `Register App` (ignore hosting) to generate the configuration code which should be presented to you at this point.
5. Copy the firebaseConfig part from the configuration code (it should look like the code below):
```
  const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id"
};
```
6. Head back to your project and open it in a code editor, e.g., VSCode.
7. Open the App.js file and replace the `firebaseConfig` with the code you have copied.

### Run Your App
1. In your terminal, navigate to your project's root folder.
2. Run `npx expo start` which should launch the Metro Bundler that serves your application.
3. Both your device with the Expo Go app and your computer you run the project from should be on the same network. 

#### Running on an Emulator
1. Ensure you have an Android or iOS emulator running.
2. Press a (for Android) or i (for iOS) in the Expo CLI to start the app on the emulator.

#### Running on a Physical Device
1. Install the Expo Go app from the App Store or Google Play.
2. Scan the QR code generated by `npx expo start` to run the app on your device.
