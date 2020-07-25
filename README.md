
### A Instagram Private Web API client 📷🔥 ❤️

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/m1n007)

Simple, easy implementation of the Instagram private web API.

## Install

```bash
npm install node-insta-web-api
```

## Usage

```
//get profile data
const Insta = require('node-insta-web-api')
const InstaClient = new Insta();

(async () => {
    await InstaClient.login('username','password');
    const profileData = await InstaClient.getProfileData();
    console.log(profileData)
})()

//get image by username
const Insta = require('node-insta-web-api')
const InstaClient = new Insta();

(async () => {
   await Insta.getCookie()
   const photos = await Insta.getImageByUser('username');
   console.log(photos)
})()

//update bio using existing cookies
const Insta = require('node-insta-web-api')
const InstaClient = new Insta();

(async () => {
    await InstaClient.useExistingCookie()
    const payload = {
        biography: 'test update bio 1'
    }
    const result = await InstaClient.updateProfile(payload)
    console.log(result)
})()
```

## API Reference

* [Instagram](#instagramcredentials-opts)
  * [.useExistingCookie()](#useExistingCookie)
  * [.login(username, password)](#login)
  * [.getProfileData()](#getProfileData)
  * [.changeProfileImage(image)](#changeProfileImage)
  * [.getImageByUser(username)](#getImageByUser)

### useExistingCookie()
  ```js
  await client.useExistingCookie()
  ```
  > u can use existing cookies, if you don't want to log in repeatedly

### login(username, password)
  ```js
  await client.login('username', 'password')
  ```
  > Login.
  - `username`: A `String`
  - `password`: A `String`

### getProfileData()
  ```js
    //login required
    await InstaClient.login('username','password');
    const profileData = await InstaClient.getProfileData();
    console.log(profileData)
  ```
  > Getting profile data.

### changeProfileImage(image)
  ```js
    //login required
    //by url
    await InstaClient.login('username','password');
    await InstaClient.changeProfileImage('url')

    //by path
    await InstaClient.login('username','password');
    const photo = path.join(__dirname, 'blackhat.png');
    await InstaClient.changeProfileImage(photo)
  ```
  > Change Profile Image.
  - `image` : A `String` url / image path

### updateProfile(params)
  ```js
    const payload = {
        biography: 'test update bio 1'
    }
    const a = await InstaClient.updateProfile(payload)
    console.log(a)
  ```
  > update profile. for now you can only update your bio.
  - `params`
    - `biography`: A `String` 

### getImageByUser(params)
  ```js
  await client.getImageByUser('username')
  ```
  > Gets user photos.
  - `params`
    - `username`: A `String` 


## License

MIT © [Archv Id](https://archv.id/)