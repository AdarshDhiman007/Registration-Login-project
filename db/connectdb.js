import mongoose from 'mongoose'

const connectDB = async(db)=>{
  try{
    await mongoose.connect(db,{dbName:'blogdb'})    
    console.log('Connected Successfully')
  }catch(error){
    console.log(error)
  }
}

export default connectDB