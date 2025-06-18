import Express from 'express';
import mongoose from 'mongoose';
import router from './routes/routes.js';

const app = Express();
const PORT = process.env.PORT || 3000;
const DB = 'mongodb://localhost:27017/BARKARAS';

app.use(Express.json());
app.use('/api', router);

const StarterFunc = async () => {
  try {
    await mongoose.connect(DB);
    app.listen(PORT, () => {
      console.log(
        `\x1b[40m`,
        `\x1b[32m`,
        `
        ================================
        
       ___  __  ___  _______  _______
      / _ \\/ / / / |/ /  _/ |/ / ___/
     / , _/ /_/ /    // //    / (_ / 
    /_/|_|\\____/_/|_/___/_/|_/\\___/  
    
    
    =================================                            
`,
        `\x1b[0m`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

StarterFunc();
