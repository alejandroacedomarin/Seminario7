import { Application, Request, Response } from 'express';
import { ReviewController } from '../controllers/reviewController';

export class ReviewRoutes {

    private review_controller: ReviewController = new ReviewController();

    public route(app: Application) {
        
        app.post('/review', (req: Request, res: Response) => {
            this.review_controller.create_review(req, res);
        });

        app.get('/review/:id', (req: Request, res: Response) => {
            this.review_controller.get_review(req, res);
        });

        app.delete('/review/:id', (req: Request, res: Response) => {
            this.review_controller.delete_review(req, res);
        });

    }
}