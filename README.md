
### A Instagram Private Web API client 📷🔥 ❤️

Simple, easy implementation of the Instagram private web API.

## Install

```bash
npm install node-insta-web-api
```

## Usage

```
const Insta = require('node-insta-web-api')
const InstaClient = new Insta();

(async () => {
   await Insta.getCookie()
   const photos = await Insta.getImageByUser('username');
   console.log(photos)
})()
```

## API Reference

* [Instagram](#instagramcredentials-opts)
  * [.login(username, password)](#login)
  * [.changeProfileImage(image)](#changeProfileImage)
  * [.getImageByUser(username)](#getImageByUser)

### login(username, password)
  ```js
  await client.login('username', 'password')
  ```
  > Login.
  - `username`: A `String`
  - `password`: A `String`

### changeProfileImage(image)
  ```js
    //by url
    await InstaClient.login('username','password');
    await InstaClient.changeProfileImage('url')

    //by path
    await InstaClient.login('username','password');
    const photo = path.join(__dirname, 'blackhat.png');
    await InstaClient.changeProfileImage(photo)
  ```
  > Login.
  - `image` : A `String` url / image path

### getImageByUser(params)
  ```js
  await client.getImageByUser('username')
  ```
  > Gets user photos.
  - `params`
    - `username`: A `String` 


## License

MIT © [Archv Id](https://archv.id/)