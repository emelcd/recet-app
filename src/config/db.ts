import { connect } from 'mongoose'

const connectDB = (uri: string): void => {
  connect(uri).then(info => {
    console.log('Db connected!')
  }).catch(err => {
    console.log(err)
  })
}

export default connectDB
