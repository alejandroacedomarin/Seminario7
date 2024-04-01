import { Request, Response } from 'express';
import { IReview } from '../modules/reviews/model';
import ReviewService from '../modules/reviews/service';
import e = require('express');

export class ReviewController {


    private review_service: ReviewService = new ReviewService();

    public async create_review(req: Request, res: Response) {
        try{
            if (req.body.titulo && req.body.contenido && req.body.numEstrellas && req.body.autorRef) {
                const review_params: IReview = {
                    titulo: req.body.titulo,
                    contenido: req.body.contenido,
                    numEstrellas: req.body.numEstrellas,
                    autorRef: req.body.autorRef,
                };
                const review_data = await this.review_service.createReview(review_params);

                return res.status(201).json({ message: 'Review created successfully', review: review_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_review(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                const review_data = await this.review_service.filterReview(review_filter);
                // Send success response
                return res.status(200).json({ data: review_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }


    public async delete_review(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const delete_details = await this.review_service.deleteReview(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    return res.status(400).json({ error: 'User not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}