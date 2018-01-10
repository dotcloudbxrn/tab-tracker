import Api from '@/services/Api'

// this exports an object that has a couple of properties
export default {
  // this is the method
  register (credentials) {
    // you just return a post request with the first parameter
    // as an endpoint
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}
