import { Application, Request, Response } from 'express';
import {AuthController} from '../controllers/authController';
import User from '../modules/users/schema';


export class AuthRoutes{
    private auth_controller: AuthController= new AuthController;

    public route(app: Application){


        app.post('/signup', (req: Request, res: Response) => {
            this.auth_controller.signup(req, res);
        });

        /* app.post("/signin", async (req, res, next) => {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
              return res.status(404).send("The email doesn t exists");
            }
        
    } */
}



}