import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.URI 
        
        if (!uri) {
            throw new Error('MongoDB URI is not defined');
        }

        await mongoose.connect(uri); // Simplified connection
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process with failure
    }
};
export default connectDB;