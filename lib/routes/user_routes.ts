import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { TokenValidation } from 'middleware/validateToken';

export class UserRoutes {

    private user_controller: UserController = new UserController();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        
        app.post('/signup', (req: Request, res: Response) => {
            this.auth_controller.signup(req, res);
        });

        app.get('/signin/:password', (req: Request, res: Response) => {
            this.auth_controller.signin(req, res);
        });
        /*
        app.post('/signup', (req: Request, res: Response) => {
            this.auth_controller.signup(req, res);
        });
        */
        app.get('/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        //app.get('/:id',this.auth_controller.get_user, this.user_controller.get_user );

        app.put('/:id',this.auth_controller.update_user, this.user_controller.update_user );

        app.delete('/:id', this.auth_controller.delete_user, this.user_controller.delete_user);

    }
}