import { IReview } from './model';
import reviews from './schema';
import { Types } from 'mongoose';

export default class ReviewService {
    
    public async createReview(reviews_params: IReview): Promise<IReview> {
        try {
            const session = new reviews(reviews_params);
            const result = await session.save();
            // Convert _id to string
            const newReview: IReview = { ...result.toObject(), _id: result._id.toString() };
            return newReview;
        } catch (error) {
            throw error;
        }
    }

    public async filterReview(query: any): Promise<IReview | null> {
        try {
            return await reviews.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deleteReview(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await reviews.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

  

}