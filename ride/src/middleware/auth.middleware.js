import jwt from 'jsonwebtoken'
import axios from 'axios'

const userAuth = async (res, req) => {
    try {
        const token = req.cookie.token || req.header.authorization.split('')[1];
        if (!token) {
            return res.status(400).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const response = await axios.get(`${process.env.BASE_URL}/user/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const user = response.data
        if (!user) {
            return res.status(400).json({ message: 'Unauthoized' })
        }
        req.user = user;
        next()
        console.log(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export default userAuth;