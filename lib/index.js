const request = require('./request');
const helpers = require('./helpers/helper');
const useragentFromSeed = require('useragent-from-seed');

class Instagram{
    constructor(){
        this.baseUrl = 'https://www.instagram.com/';
        this.ig_did = '';
        this.csrf = '';
        this.rur = '';
        this.mid = '';
        this.username = '';
        this.phoneNumber = '';
        this.firstName = '';

        this.headers = {
            'authority': 'www.instagram.com',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://www.instagram.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'x-ig-app-id': 936619743392459,
            'x-ig-www-claim': 'hmac.AR3W0DThY2Mu5Fag4sW5u3RhaR3qhFD_5wvYbOJOD9qaPjIf',
            'x-instagram-ajax': '5c9893acebd5',
            'x-requested-with': 'XMLHttpRequest'
        }

        this.request = request.instagram;
    }

    async getCookie(){
        try{
            this.headers["user-agent"] = useragentFromSeed();
            const cookie = await this.request.getCookie(this.baseUrl, this.headers);
            this.ig_did = cookie[7].split(';')[0];
            this.csrf = cookie[8].split(';')[0];
            this.rur = cookie[9].split(';')[0];
            this.mid = cookie[10].split(';')[0];
            this.headers.cookie = `${this.ig_did}; ${this.csrf}; ${this.rur}; ${this.mid}`
        }catch(e){
            return e;
        }
    }

    async registerLastAttemp(phoneNumber, username, firstName){
        try {
            this.username = username;
            this.firstName = firstName;
            this.phoneNumber = phoneNumber;
            const dataString = `enc_password=%23PWD_INSTAGRAM_BROWSER%3A10%3A1595484965%3AASxQAJhy%2B2HXqx4Bzjs3Z1OvBWTXUc8ZY%2BFpEcjR3rKkSPUIA%2Blu4cnFPmPLw6ysy%2FwllAmmanFdbOKoZr%2FTJyyTrmoAulcLD1zmGAJZ2aQTgvwzI%2FJMYaDvIv5pxqhrphQzrTP56znC%2BUUumDlA&phone_number=${phoneNumber}&username=${username}&first_name=${firstName}&month=4&day=6&year=2000&client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&seamless_login_enabled=1`;
            this.headers.referer = 'https://www.instagram.com/accounts/emailsignup/';
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/web_create_ajax/attempt/`, dataString, this.headers);
            return register;
        }catch(e){
            return e;
        }

    }

    async registerSendOtp(phoneNumber){
        try {
            const dataString = `client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&phone_number=${phoneNumber}&phone_id=&big_blue_token=`;
            this.headers.referer = 'https://www.instagram.com/accounts/emailsignup/';
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/send_signup_sms_code_ajax/`, dataString, this.headers);
            return register;
        }catch(e){
            return e;
        }

    }

    async registerLastProcess(otpCode){
        try {
            const dataString = `enc_password=%23PWD_INSTAGRAM_BROWSER%3A10%3A1595485018%3AASxQADjJnU5taC7J%2F9YgbENZqLj%2FM1fIKHeh8iQlgWq3eko3WwbZdWnVjKnHPGIB05AU8%2BeaK1tk%2FPR6a93VwnYfdHXuhwS3Z9y6uCMVvyK7qw0o%2BkrOYz4l%2FOPppvnjULaeaFXn2rM38BQRyArp&phone_number=${this.phoneNumber}&username=${this.username}&first_name=${this.firstName}&month=4&day=6&year=2000&sms_code=${otpCode}&client_id=XrgMsAAEAAFhEED7k1NgmN3ULAB_&seamless_login_enabled=1&tos_version=row`;
            this.headers.referer = 'https://www.instagram.com/accounts/emailsignup/';
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const register = await this.request.postResJson(`${this.baseUrl}accounts/web_create_ajax/`, dataString, this.headers);
            return register;
        }catch(e){
            return e;
        }

    }

    async getImageByUser(username){
        try {
            this.headers.referer = 'https://www.instagram.com/accounts/emailsignup/';
            this.headers["x-csrftoken"] = this.csrf.split('=')[1];
            const getHtml = await this.request.getHtml(`https://www.instagram.com/${username}/`, this.headers);
            const resultData = helpers.getString('<script type="text/javascript">window._sharedData =', '};</script>', getHtml);
            const resultJsonStringData = `${resultData[1]}}`;
            const resultJson = JSON.parse(resultJsonStringData)
            return resultJson.entry_data.ProfilePage[0].graphql;
        }catch(e){
            return e;
        }

    }

}

module.exports = Instagram;