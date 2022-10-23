import express from 'express';
import mysql from 'mysql';
import cors from 'cors'; 
import Joi from 'joi';

const signUp = Joi.object({
  userName: Joi.string().min(5).max(16).required().regex(/^[_a-zA-Z0-9]*$/m).messages({
    "string.empty": `user name field cant be blank`,
    "any.required": `user name is require`,
    "string.min": `user name must be have 5 characters at least`,
    "string.max": `user name must be have 16 characters as max`,
    "string.pattern.base": `Username can only contain A-Z, 0-9 and _`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `email field cant be blank`,
    "any.required": `email is require`,
    "string.email": `email must be have the user@mail.com format`,
  }),
  password: Joi.string().min(6).max(16).required().messages({
    "string.empty": `password field cant be blank`,
    "any.required": `password is require`,
    "string.min": `password must be have 6 characters at least`,
    "string.max": `password must be have 16 characters as max`,
  }),
  passwordRetry: Joi.string().min(6).max(16).required().valid(Joi.ref('password')).messages({
    "string.empty": `password confirmation field cant be blank`,
    "any.required": `password confirmation is require`,
    "string.min": `password confirmation must be have 6 characters at least`,
    "string.max": `password confirmation must be have 16 characters as max`,
    "any.only": `passwords must be the same`,
  }),
});

const app = express();

const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root123',
        database:'backloggd'
    }
)

app.use(express.json())
app.use(cors())

db.connect(err=>
    {
        if(err)return console.log('failed to connect '+err)
        console.log('successfully connected with mysql')
    })

app.post('/sign_up',(req,res)=>
{
    const{value,error}=signUp.validate(req.body,{abortEarly:false});

    if(error)
    {
        if(value.userName&&(value.userName?.match(/[a-z]/gi)||[]).length<3)
        {
            res.json([{message:'Username must be have 3 characters A-Z at least'},...error.details])
            return
        }
        res.json(error.details)
        return
    }

    const q = 'create table'

    res.json('ok')
})

app.listen(8800,()=>
{
   console.log('listen 8800 port')
})

