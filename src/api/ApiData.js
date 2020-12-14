import axios from 'axios'

export const backEndDevURL = 'http://localhost:1337'
export const frontEndDevURL = 'http://localhost:3000'

export const backEndProURL = 'https://strapi-mongo-cloudinary.herokuapp.com'
export const frontEndProURL = 'https://jinzhu-game.netlify.app'


export const setTetrisScore = async (userName, score) =>{
    const data = {
        "username": userName,
        "score": score
    }
    try {
      await axios.post(`${backEndProURL}/tetris-games`, data,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
    } catch (error) {
      console.log(error)
    }
 }

 export const getTetrisScores = async () =>{

    const scores = await axios.get(`${backEndProURL}/tetris-games`)
      console.log(scores.data)
      return (scores.data)
 }

 