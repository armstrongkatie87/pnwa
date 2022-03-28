const config = {
    env: process.env.NODE_ENV || 'development',//to diff b/t dev & prod mode
    port: process.env.PORT || 3000,//to def the listening port for the server
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",//the secret key to be used to sign JWT
    mongoUri: process.env.MONGODB_URI ||//the location of MongoDb database instance for proj
      process.env.MONGO_HOST ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/pnwa'
  }
  
  export default config