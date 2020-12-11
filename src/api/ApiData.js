import axios from 'axios'

export const backEndDevURL = 'http://localhost:1337'
export const frontEndDevURL = 'http://localhost:3000'

export const backEndProURL = 'https://strapi-mongo-cloudinary.herokuapp.com'
export const frontEndProURL = 'https://unruffled-keller-be5c6d.netlify.app'


export const getUserData = () =>{
   const userData = {name: localStorage.getItem('userName'), jwt: localStorage.getItem('jwt'),  role: localStorage.getItem('userRole'), id: localStorage.getItem('userId')}
   return userData

}

export const setTetrisScore = async (score) =>{
    const data = {
        "username": localStorage.getItem('userName'),
        "score": score
    }
    await axios.post(`${backEndProURL}/tetris-games`, data,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
 }

 export const getTetrisScores = async () =>{

    const scores = await axios.get(`${backEndProURL}/tetris-games`)
      console.log(scores.data)
      return (scores.data)
 }

 