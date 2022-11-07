import mongoose from 'mongoose';

export default dbConnect = (url) => {
    return mongoose.connect(url);
};
