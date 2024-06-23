import fastify from 'fastify';
import mongoose, { Document, Schema } from 'mongoose';

const app = fastify({ logger: true });

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud';

mongoose.connect(mongoUri)
  .then(() => {
    app.log.info("Connected");
  }).catch(() => {
    app.log.error("Not connected");
  });

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

app.get('/getuser', async (req, reply) => {
  try {
    const users = await UserModel.find({});
    reply.send(users);
  } catch (err) {
    app.log.error(err);
    reply.status(500).send(err);
  }
});

const start = async () => {
  try {
    await app.listen({ port: 5000 });
    app.log.info("Service is running on port 5000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
