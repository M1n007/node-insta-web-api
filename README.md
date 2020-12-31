
### A Instagram Private Web API client 📷🔥 ❤️

Simple, easy implementation of the Instagram private web API.

Some API reference from [jlobos/instagram-web-api](https://github.com/jlobos/instagram-web-api)
 
Send DM using client from [dilame/instagram-private-api](https://github.com/dilame/instagram-private-api)


## Install

```bash
npm install node-insta-web-api
```

## Usage

```
//send dm by username


const Insta = require('node-insta-web-api')
const InstaClient = new Insta();

(async () => {
  //required username & password for login
  const username = '';
  const password = '';
  const usernameReceiver = ['username target'];
  const message = 'text message';

  const result = await InstaClient.sendDmByUsername(username, password, usernameReceiver, message);
  console.log(result)
})()

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

//get following with pagination using existing cookie
await InstaClient.useExistingCookie();
const dataUser = await InstaClient.getProfileByUsername('amin_udin69');
let following;
let hasNextPage;
let endCursor = '';
const resultAllFollowing = [];
do{
    following = await InstaClient.getFollowingByDataUser(dataUser, 12, endCursor);
    hasNextPage = following.page_info.has_next_page;
    endCursor = following.page_info.end_cursor;
    for (let index = 0; index < following.edges.length; index++) {
        const element = following.edges[index];
        resultAllFollowing.push(element.node)
        
    }
}while(hasNextPage);
console.log(resultAllFollowing)
```

## API Reference

* [Instagram](#instagramcredentials-opts)
  * [.getCookie()](#getCookie)
  * [._getMediaId(url)](#_getMediaId)
  * [.useExistingCookie()](#useExistingCookie)
  * [.login(username, password)](#login)
  * [.getProfileData()](#getProfileData)
  * [.changeProfileImage(image)](#changeProfileImage)
  * [.getImageByUser(username)](#getImageByUser)
  * [.getVideoByShortCode(shortCode)](#getVideoByShortCode)
  * [.getLoginActivity()](#getLoginActivity)
  * [.getRecentNotification()](#getRecentNotification)
  * [.getDirectMessage()](#getDirectMessage)
  * [.getProfileByUsername(username)](#getProfileByUsername)
  * [.followByUsername(username)](#followByUsername)
  * [.unfollowByUsername(username)](#unfollowByUsername)
  * [.getStoriesByUsername(username)](#getStoriesByUsername)
  * [.likeMediaById(mediaId)](#likeMediaById)
  * [.likeMediaByShortCode(shortCode)](#likeMediaByShortCode)
  * [.unlikeMediaByShortCode(shortCode)](#unlikeMediaByShortCode)
  * [.deleteMediaByShortCode(shortCode)](#deleteMediaByShortCode)
  * [.saveImageByShortCode(shortCode)](#saveImageByShortCode)
  * [.unsaveImageByShortCode(shortCode)](#saveImageByShortCode)
  * [.commentToMediaByMediaId({shortCode, commentText})](#commentToMediaByMediaId)
  * [.commentToMediaByShortCode({shortCode, commentText})](#commentToMediaByShortCode)
  * [.replyCommentByShortCode({shortCode, commentText, commentId})](#replyCommentByShortCode)
  * [.getEmbedMediaByShortCode(shortCode)](#getEmbedMediaByShortCode)
  * [.getMediaFeedByHashtag(name)](#getMediaFeedByHashtag)
  * [.getUserPostById(userId)](#getUserPostById)
  * [.findPeopleByUserId(userid)](#findPeopleByUserId)
  * [.findPeopleByUsername(username)](#findPeopleByUsername)
  * [.addPost(image, caption)](#addPost)
  * [.addStory(image)](#addStory)
  * [.getFollowingByDataUser(dataUser, size, cursor)](#getFollowingByDataUser)
  * [.sendDmByUsername(username, password, usernameReceiver, message)](#sendDmByUsername)
  * [.sendConfirmationEmail()](#sendConfirmationEmail)

### getCookie()
  ```js
  await client.getCookie()
  ```
  > getting guest cookie

### _getMediaId(url)
  ```js
  await client._getMediaId('https://www.instagram.com/p/CDFIAxxxxx/')
  ```
  > getting media id by url
  - `url`: A `String`

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

    //using a url is under development
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
        biography: 'test update bio 1',
        email: 'update@email.com'
    }
    const a = await InstaClient.updateProfile(payload)
    console.log(a)
  ```
  > update profile. for now you can only update your bio.
  - `params`
    - `biography`: A `String` 
    - `email`: A `String` 

### getImageByUser(params)
  ```js
  await client.getImageByUser('username')
  ```
  > Gets user photos.
  - `username`: A `String` 

### getVideoByShortCode(shortCode)
  ```js
    const data = await InstaClient.getVideoByShortCode('CDDs8unBjXX');
    fs.writeFileSync('./test.mp4', data.base64, 'base64')
    console.log(data)
  ```
  > Get video base64 and buffer by short code.
  - `shortCode`: A `String` 

### getLoginActivity()
  ```js
    //login required
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getLoginActivity();
    console.log(data)
  ```
  > get login activity.

### getRecentNotification()
  ```js
    //login required
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getRecentNotification();
    console.log(data)
  ```
  > get recent notification.

### getDirectMessage()
  ```js
    //login required
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getDirectMessage();
    console.log(data)
  ```
  > get direct message.

### getProfileByUsername(username)
  ```js
    await InstaClient.getCookie()
    const data = await InstaClient.getProfileByUsername('username');
    console.log(data)
  ```
  > get profile user.
  - `username`: A `String` 

### followByUsername(username)
  ```js
    //login required
    await InstaClient.useExistingCookie()
    const data = await InstaClient.followByUsername('username');
    console.log(data)
  ```
  > follow user by username.
  - `username`: A `String` 

### unfollowByUsername(username)
  ```js
    //login required
    await InstaClient.useExistingCookie()
    const data = await InstaClient.unfollowByUsername('username');
    console.log(data)
  ```
  > unfollow user by username.
  - `username`: A `String` 

### getStoriesByUsername(username)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getStoriesByUsername('username');
    console.log(data)
  ```
  > get stories by username.
  - `username`: A `String` 

### likeMediaById(mediaId)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.likeMediaById(00000);
    console.log(data)
  ```
  > like media by media id
  - `mediaId`: A `Number` 

### likeMediaByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.likeMediaByShortCode('CDFIAQtHUxxxx');
    console.log(data)
  ```
  > like media by shortcode
  - `shortCode`: A `String` 

### unlikeMediaByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.unlikeMediaByShortCode('CDFIAQtHUxxxx');
    console.log(data)
  ```
  > unlike media by shortcode
  - `shortCode`: A `String` 

### deleteMediaByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.deleteMediaByShortCode('CDFIAQtHUxxxx');
    console.log(data)
  ```
  > delete media by shortcode
  - `shortCode`: A `String` 

### saveImageByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.saveImageByShortCode('CDFIAQtHUxxxx');
    console.log(data)
  ```
  > save media by shortcode
  - `shortCode`: A `String` 

### unsaveImageByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.unsaveImageByShortCode('CDFIAQtHUxxxx');
    console.log(data)
  ```
  > save media by shortcode
  - `shortCode`: A `String` 

### commentToMediaByMediaId(params)
  ```js
    await InstaClient.useExistingCookie()
    const payload = {
        mediaId: 100000,
        commentText: 'Your Text Comment'
    }
    const data = await InstaClient.commentToMediaByMediaId(payload);
    console.log(data)
  ```
  > add comment to a media by shortcode
  - `params`
    - `mediaId`: A `Number` 
    - `commentText`: A `String`

### commentToMediaByShortCode(params)
  ```js
    await InstaClient.useExistingCookie()
    const payload = {
        shortCode:'CDFIAQxxxx',
        commentText: 'Your Text Comment'
    }
    const data = await InstaClient.commentToMediaByShortCode(payload);
    console.log(data)
  ```
  > add comment to a media by shortcode
  - `params`
    - `shortCode`: A `String` 
    - `commentText`: A `String`

### replyCommentByShortCode(params)
  ```js
    await InstaClient.useExistingCookie()
    const payload = {
        shortCode:'CDFIAQtxxxx',
        commentText: '%40username reply comment',
        commentId: '17870873200867xxx'
    }
    const data = await InstaClient.replyCommentByShortCode(payload);
    console.log(data)
  ```
  > reply comment in media by shortcode
  - `params`
    - `shortCode`: A `String` 
    - `commentText`: A `String` 
    - `commentId`: A `String` 

### getEmbedMediaByShortCode(shortCode)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getEmbedMediaByShortCode('CDFIAQtHUiw');
    console.log(data)
  ```
  > get embed media by shortCode
  - `shortCode`: A `String` 

### getMediaFeedByHashtag(name)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.getMediaFeedByHashtag('berita');
    console.log(data)
  ```
  > get post by hastag
  - `name`: A `String` 

### getUserPostById(userId)
```js
  await InstaClient.useExistingCookie()
  const data = await InstaClient.getUserPostById(00000);
  console.log(data)
```
> get post by user id
- `userId`: A `Number` 

### findPeopleByUserId(userid)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.findPeopleByUserId(00000);
    console.log(data)
  ```
  > find people by userid
  - `userid`: A `Number`

### findPeopleByUsername(username)
  ```js
    await InstaClient.useExistingCookie()
    const data = await InstaClient.findPeopleByUsername('menjadi');
    console.log(data)
  ```
  > find people by username
  - `username`: A `String`

### addPost(image, caption)
  ```js
    const photo = path.join(__dirname, '3.jpeg');
    await InstaClient.useExistingCookie();
    const resultAddPost = await InstaClient.addPost(photo, 'this is caption');
    console.log(resultAddPost)
  ```
  > add post to feed
  - `image`: A `String` path of image
  - `caption`: A `String`

### addStory(image)
  ```js
    const photo = path.join(__dirname, '3.jpeg');
    await InstaClient.useExistingCookie();
    const resultAddStory = await InstaClient.addStory(photo);
    console.log(resultAddStory)
  ```
  > add story
  - `image`: A `String` path of image

### getFollowingByDataUser(dataUser, size, cursor)
  ```js
    await InstaClient.useExistingCookie();
    const dataUser = await InstaClient.getProfileByUsername('amin_udin69');
    let following;
    let hasNextPage;
    let endCursor = '';
    const resultAllFollowing = [];
    do{
        following = await InstaClient.getFollowingByDataUser(dataUser, 12, endCursor);
        hasNextPage = following.page_info.has_next_page;
        endCursor = following.page_info.end_cursor;
        for (let index = 0; index < following.edges.length; index++) {
            const element = following.edges[index];
            resultAllFollowing.push(element.node)
            
        }
    }while(hasNextPage);
    console.log(resultAllFollowing)
  ```
  > get following by data user
  - `dataUser`: A `Object` data user
  - `size`: A `Number` size per page
  - `cursor`: A `String` end cursor

### sendDmByUsername(username, password, usernameReceiver, message)
  ```js
  //login required
    const username = ''; //required
    const password = ''; //required
    const usernameReceiver = ['username target'];
    const message = 'text message';

    const result = await InstaClient.sendDmByUsername(username, password, usernameReceiver, message);
    console.log(result)
  ```
  > send dm
  - `username`: A `String` username for login
  - `password`: A `String` password for login
  - `usernameReceiver`: A `Array` list username receiver message/dm
  - `message`: A `String` text message

### sendConfirmationEmail()
  ```js
   await InstaClient.useExistingCookie();
   const sendConfirmationEmailResult = await InstaClient.sendConfirmationEmail();
   console.log(sendConfirmationEmailResult)
  ```


## License

MIT © [Archv Id](https://archv.id/)