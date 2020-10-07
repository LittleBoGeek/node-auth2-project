const express = require("express")
const bcrypt = require("bcryptjs")
const User = require("./user-model")
const secrets = require('../database/secret')
const jwt = require('jsonwebtoken');

const restricted = require('./userMiddleware')

const router = express.Router()



// router.get("/users", restricted, (req, res) => {
// User.find()
// .then(users => {
//     res.status(200).json(users)
// }) .catch( err => {
//     res.status(400).json({message:"There was an error"})
// })
//     })

    router.get("/", restricted, (req, res) => {
     Users.find()
     .then(users => {
         res.status(200).json(users)     
        })
        .catch(err => res.send(err));
       
    })




// router.post("/register", async (req, res, next) => {
//     const {username, password, department} = req.body

//     try {
//         const user = await User.findBy({username}).first()

//         if(user) {
//             return res.status(409).json({message: "username is already taken",
//         })
//         } 
//         const newUser = await User.add({
//             username,
//             password: await bcrypt.hash(password, 15),
//             department,
//         })
//         res.status(201).json(newUser)
//     } catch(err) {
//         next(err)
//     }
// })

router.post("/register", async (req,res,next)=>{
    try {
		const { username, password,department } = req.body
		const user = await User.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await User.add({
			username,
            password: await bcrypt.hash(password, 15),
            department,
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})


router.post("/login", async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await User.findBy({username}).first()
        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials',
        })
        } const passwordI = await bcrypt.compareSync(password, user.password)
     
        if(!passwordI) {
            return res.status(401).json({
                message:"Invalid Password",
            })
        } else {
            const payload = {
                subject:user.id,
                username: user.username,
                department: user.department
            };
            const secret = 'secret password';
      
            const options = {
                expiresIn:"1d"
            }
      
            const token = jwt.sign(payload, secret, options)
            res.json({ message:`Welcome  ${user.username} `, token})
        }
    } catch(err) {
        next(err)
    }
})

// function generateToken(user) {
//     const payload = {
//         subject: user.id,
//         username:user.username,
//     };

//     const options = {
//         expiresIn:'1d',
//     };
// return jwt.sign(payload, secrets.jwtSecret, options);
// }


module.exports = router 
