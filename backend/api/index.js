import { app } from '../src/app.js';
import connectDB from '../src/db/index.js';

connectDB(); // Ensure DB connects

export default app;
