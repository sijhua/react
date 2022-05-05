import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL:  "https://example.api",// url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 2000 // request timeout
  })
  
  // request interceptor
  service.interceptors.request.use(
    config => {

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  service.interceptors.response.use(

    response => {
      const res = response.data
      if(res.code){
        if (res.code !== 0) {
        //   TODO
          return Promise.reject(new Error(res))

        } else {
          return res
        }
      }else{
        return res
      }
    },
    error => {
      let message = error.message 
      if (error.response && error.response.data) {
        const { data } = error.response
      }
      alert(message)
      return Promise.reject(error.response.data)
    }
  )

  export default service