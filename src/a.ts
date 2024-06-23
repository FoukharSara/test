import fastify from 'fastify';
import mongoose, { Document, Schema } from 'mongoose';

// Initialize Fastify app
const app = fastify({logger:true});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crud')
  .then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });


//User Interface (IUser): Before we write anything in our digital book (MongoDB), we decide what each piece of information (or document) should look like. Here, it's saying each document should have a name and an age.
//User Schema: This is like a checklist for how we write things in our digital book. It says each document must have a name and age, and both must be filled out (required: true).

// Define User interface
interface IUser extends Document {
  name: string;
  age: string;
}

// Define User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true }
});

// Create User model
const UserModel = mongoose.model<IUser>('User', UserSchema);

// Define /getuser endpoint
app.get("/getuser", async (request, reply) => {
  try {
    const users = await UserModel.find({});
    reply.send(users);
  } catch (err) {
    console.error(err);
    reply.status(500).send(err);
  }
});

// Start server
const start = async () => {
  try {
    await app.listen(5000);
    console.log("Service is running on port 5000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
