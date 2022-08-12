import UserModel from "../models/user.js"
import bcrypt from 'bcrypt'

class UserController {

  static home = (req,res)=>{
    res.render('index')
  }

  static registration = (req,res)=>{
    res.render('registration')
  }

  static createUserDoc = async (req,res)=>{
    const hashPassword = await bcrypt.hash(req.body.password,10)
    try{

      const doc = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
      })

      await doc.save()
      res.redirect('/login')

    }catch(error){
      console.log(error)
    }

  }

  static verifyLogin = async (req,res)=>{
    try{
      const {email,password} = req.body
      const result = await UserModel.findOne({email:email})

      if(result != null){
        const isMatch = await bcrypt.compare(password,result.password)
        if(result.email==email && isMatch){
          res.send(`<h1>${result}<h1>`)
        }
        else{
          res.send('<h1>Email or password is not valid<h1>')
        }
      }
      else{
        res.send('<h1>You are not registered user<h1>')
      }

     
    }catch(error){
      console.log(error)
    }
  }

  static login = (req,res)=>{
    res.render('login')
  }


  /*Without hashed password
  static createUserDoc = async (req,res)=>{
    
    try{

      const doc = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      await doc.save()
      res.redirect('/login')

    }catch(error){
      console.log(error)
    }

  }*/


  /*static verifyLogin = async (req,res)=>{
    try{
      const {email,password} = req.body
      const result = await UserModel.findOne({email:email})

      if(result != null){
        if(result.email==email && result.password==password){
          res.send(`<h1>${result}<h1>`)
        }
        else{
          res.send('<h1>Email or password is not valid<h1>')
        }
      }
      else{
        res.send('<h1>You are not registered user<h1>')
      }

     
    }catch(error){
      console.log(error)
    }
  }*/
}

export default UserController