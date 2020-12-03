import Vue from 'vue'
import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse('adminadminadmina')
const IV = CryptoJS.enc.Utf8.parse('adminadminadmina')
export default {
    /**
     * AES加密,返回BASE64
     */
    Encrypt(word,keyParam,ivParam){
        let key = KEY,iv = IV
        if(keyParam){
            key = CryptoJS.enc.Utf8.parse(keyParam)
            iv = CryptoJS.enc.Utf8.parse(ivParam)
        }
        let srcs = CryptoJS.enc.Utf8.parse(word)
        let encrypted = CryptoJS.AES.encrypt(srcs,key,{
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.ZeroPadding
        })
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
    },
    /**
     * AES解密,返回BASE64
     */
     Decrypt(word,keyParam,ivParam){
        let key = KEY,iv = IV
        if(keyParam){
            key = CryptoJS.enc.Utf8.parse(keyParam)
            iv = CryptoJS.enc.Utf8.parse(ivParam)
        }
        let base64 = CryptoJS.enc.Base64.parse(word)
        let src = CryptoJS.enc.Base64.stringify(base64)
        let decrypt = CryptoJS.AES.decrypt(src,key,{
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.ZeroPadding
        })
        let decrypted = decrypt.toString(CryptoJS.enc.Utf8)
        return decrypted.toString()
    }
}