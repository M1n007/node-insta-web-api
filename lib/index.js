const crypto = require('crypto');
const fs = require('fs');

const request = require('./request');
const helpers = require('./helpers/helper');
const useragentFromSeed = require('useragent-from-seed');
const FormData = require('form-data');
const isUrl = require('is-url');

class Instagram{
    constructor(username,password){
        this.credentials = {
            username,
            password
        }
        this.baseUrl = 'https://www.instagram.com/';
        this.ig_did = '';
        this.csrf = '';
        this.rur = '';
        this.mid = '';
        this.username = '';
        this.phoneNumber = '';
        this.firstName = '';
        this.language = '';
        this.sessionid = '';
        this.ds_user_id = '';

        this.headers = {
            'authority': 'www.instagram.com',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://www.instagram.com',
            'accept-language': this.language || 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'x-ig-app-id': 936619743392459,
            'x-ig-www-claim': 'hmac.AR3W0DThY2Mu5Fag4sW5u3RhaR3qhFD_5wvYbOJOD9qaPjIf',
            'x-instagram-ajax': 1,
            'x-requested-with': 'XMLHttpRequest'
        }

        this.request = request.nodeFetchInstagram;
    }

    async getCookie(){
        try{
            this.headers["user-agent"] = useragentFromSeed();
            const result = await this.request.getCookie(this.baseUrl, this.headers);
            this.ig_did = result.cookie.find((x)=> { return x.includes('ig_did')}).split(';')[0];
            this.csrf = result.cookie.find((x)=> { return x.includes('csrftoken')}).split(';')[0];
            this.rur = result.cookie.find((x)=> { return x.includes('rur')}).split(';')[0];
            this.mid = result.cookie.find((x)=> { return x.includes('mid')}).split(';')[0];
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            this.headers['x-ig-www-claim'] = result.claim[0];
            this.headers.cookie = `ig_cb=1; ${this.ig_did}; ${this.csrf}; ${this.rur}; ${this.mid}`;
        }catch(e){
            return e;
        }
    }

    async useExistingCookie(){
        try{
            if (fs.existsSync('./Cookies.json')) {
                const existingCookies = await fs.readFileSync('./Cookies.json', 'utf-8');
                const existingCookiesJson = JSON.parse(existingCookies);
                this.headers = existingCookiesJson;
                const oldData = await this.getProfileData();
                console.log(`you using existing cookie for user ${oldData.username}.`)
            }else{
                console.log(`You don't have cookies yet`);
            }
        }catch(e){
            throw new Error('cookie format is wrong / expired, please try logging in again using function login().')
        }
    }

    async login(username, password){
        try{
            await this.getCookie()
            username = username || this.credentials.username
            password = password || this.credentials.password
            this.headers.referer = this.baseUrl;
            const body = `username=${username}&enc_password=${helpers.createEncPassword(password)}&queryParams=%7B%7D&optIntoOneTap=false`;

            const result = await this.request.post(`${this.baseUrl}accounts/login/ajax/`,body, this.headers);
            if (!result.headers.raw()['set-cookie']) {
                throw new Error('No cookie')
            }

            const cookies = result.headers.raw()['set-cookie'];

            if (!cookies.find((x)=> { return x.includes('sessionid')})) {
                throw new Error('Login Failed, Please Try Again Later.')
            }

            const resultJson = await result.json();
            this.ds_user_id = resultJson.userId;
            this.sessionid = cookies.find((x)=> { return x.includes('sessionid')}).split(';')[0];

            this.csrf = cookies.find((x)=> { return x.includes('csrftoken')}).split(';')[0];
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            this.headers.cookie = `ig_cb=1; ${this.ig_did}; ${this.csrf}; ${this.rur}; ${this.mid}; ds_user_id=${this.ds_user_id}; ${this.sessionid}`;

            this.credentials = {
                username,
                password,
                cookies
            }

            // this._sharedData = await this._getSharedData();
            fs.writeFileSync('Cookies.json', JSON.stringify(this.headers))
            return resultJson;
        }catch(e){
            throw new Error(e)
        }
    }

    async changeProfileImage(image){
        try{
            //this not working.
            const form = new FormData();
            form.append('profile_pic', isUrl(image) ? await this.request.getText(image) : fs.createReadStream(image));
            this.headers['content-type'] = form.getHeaders()['content-type'];
            const result = await this.request.post(`${this.baseUrl}accounts/web_change_profile_picture/`, form, this.headers);
            return await result.json();
        }catch(e){
            throw new Error(e)
        }
    }

    async getProfileData(){
        try {
            const result = await this._getSharedData(`${this.baseUrl}accounts/edit/`);
            return result.entry_data.SettingsPages[0].form_data;
        }catch(e){
            throw new Error(e)
        }
    }

    async updateProfile({
        biography = ''
      }){
        try{
            this.headers = {"authority":"www.instagram.com","content-type":"application/x-www-form-urlencoded","origin":"https://www.instagram.com","accept-language":"id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7","sec-fetch-site":"same-origin","sec-fetch-mode":"cors","sec-fetch-dest":"empty","x-ig-app-id":936619743392459,"x-ig-www-claim":"hmac.AR3W0DThY2Mu5Fag4sW5u3RhaR3qhFD_5wvYbOJOD9qaPjIf","x-instagram-ajax":1,"x-requested-with":"XMLHttpRequest","user-agent":"Mozilla/5.0 (Linux; Android 6.0; HTC One M9 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36","x-csrftoken":"UC2RovOI4V22pYSDQ4aDn7oLLMaqNuWK","cookie":"ig_cb=1; ig_did=09FA640E-A9A7-41BB-8DAB-8437980FC755; csrftoken=UC2RovOI4V22pYSDQ4aDn7oLLMaqNuWK; rur=ATN; mid=XxwGAwABAAF1WtSfUY1ETl7X_aki; ds_user_id=39015607291; sessionid=39015607291%3AXSuljdrFXrExzt%3A14","referer":"https://www.instagram.com/"}
            const oldData = await this.getProfileData();
            this.headers.referer = `${this.baseUrl}accounts/edit/`;
            const payload = `first_name=${oldData.first_name}&email=&username=${oldData.username}&phone_number=${oldData.phone_number}&biography=${biography || oldData.biography}&external_url=&chaining_enabled=on`;
            const result = await this.request.post(`${this.baseUrl}accounts/edit/`, payload, this.headers);
            return await result.json();
        }catch(e){
            throw new Error(e)
        }
    }



    async registerLastAttemp(phoneNumber, username, password,firstName){
        try {
            this.username = username;
            this.firstName = firstName;
            this.phoneNumber = phoneNumber;
            const dataString = `enc_password=${helpers.createEncPassword(password)}&phone_number=${phoneNumber}&username=${username}&first_name=${firstName}&month=4&day=6&year=2000&client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&seamless_login_enabled=1`;
            this.headers.referer = `${this.baseUrl}accounts/emailsignup/`;
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/web_create_ajax/attempt/`, dataString, this.headers);
            return register;
        }catch(e){
            throw new Error(e)
        }

    }

    async registerSendOtp(phoneNumber){
        try {
            const dataString = `client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&phone_number=${phoneNumber}&phone_id=&big_blue_token=`;
            this.headers.referer = `${this.baseUrl}accounts/emailsignup/`;
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/send_signup_sms_code_ajax/`, dataString, this.headers);
            return register;
        }catch(e){
            throw new Error(e)
        }

    }

    async registerLastProcess(otpCode){
        try {
            const dataString = `enc_password=${helpers.createEncPassword(password)}&phone_number=${this.phoneNumber}&username=${this.username}&first_name=${this.firstName}&month=4&day=6&year=2000&sms_code=${otpCode}&client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&seamless_login_enabled=1&tos_version=row`;
            this.headers.referer = `${this.baseUrl}accounts/emailsignup/`;
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/web_create_ajax/`, dataString, this.headers);
            return register;
        }catch(e){
            throw new Error(e)
        }

    }

    async _getSharedData(url = this.baseUrl) {
        try{
            const getText = await this.request.getText(url, this.headers);
            const _sharedData = helpers.getString('<script type="text/javascript">window._sharedData =', '};</script>', getText);
            const resultJsonStringData = `${_sharedData[1]}}`;
            const resultJson = JSON.parse(resultJsonStringData);
            return resultJson;
        }catch(e){
            throw new Error(e)
        }
    }

    async _getGis(path) {
        const { rhx_gis } = this._sharedData || (await this._getSharedData(path))
    
        return crypto
          .createHash('md5')
          .update(`${rhx_gis}:${path}`)
          .digest('hex')
      }

    async getImageByUser(username){
        try {
            const result = await this._getSharedData(`${this.baseUrl}${username}/`);
            return result.entry_data.ProfilePage[0].graphql;
        }catch(e){
            throw new Error(e)
        }

    }

}

module.exports = Instagram;