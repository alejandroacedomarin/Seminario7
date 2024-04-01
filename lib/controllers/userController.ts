import { Request, Response } from 'express';
import { IUser } from '../modules/users/model';
import UserService from '../modules/users/service';
import e = require('express');
import User from '../modules/users/schema';  

var jwt = require('jsonwebtoken');
var token;

export class UserController {

    private user_service: UserService = new UserService();

   

    public async get_user(req: Request, res: Response) {
        try{
            const user_filter = { _id: req.params.id };
                // Fetch user
                const user_data = await this.user_service.populateUserPosts(user_filter);

                var tokenRecibido = req.headers.authorization;
                //console.log(req.headers)

                const tokenPart = tokenRecibido.split(' ')[1];
                
                var decoded = jwt.verify(tokenPart, 'aaaa');
                
                if (req.params.id !== decoded.foo ) {
                    return res.status(200).json({ data: user_data.name,email:user_data.email,gender:user_data.gender, message: 'Successful'});
                }

                return res.status(200).json({ data: user_data, message: 'Successful'});
        
        
        
        }catch(error){
            console.log(res,req);
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }



    public async get_user_unauthorized(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const user_filter = { _id: req.params.id };
                // Fetch user
                const user_data = await this.user_service.populateUserPosts(user_filter);
                var tokenRecibido = req.headers.authorization;
                //console.log(req.headers)
                console.log('*'+tokenRecibido+"*")

                const tokenPart = tokenRecibido.split(' ')[1];

                console.log("TOKEN: " + tokenPart);
                
                var decoded = jwt.verify(tokenPart, 'aaaa');
                console.log(decoded.foo);

                return res.status(200).json({ data: user_data, message: 'Successful'});

            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
    public async update_user(req: Request, res: Response) {

        //SOLO PUEDE ACTUALIZAR UN USUARIO EL PROPIO USUARIO
        
            if (req.params.id) {
                const user_filter = { _id: req.params.id };
                // Fetch user
                const user_data = await this.user_service.filterUser(user_filter);
                if (!user_data) {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'User not found' });
                }else{
                    const user_params: IUser = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            first_name: req.body.name.first_name || user_data.name?.first_name,
                            middle_name: req.body.name.middle_name || user_data.name?.middle_name,
                            last_name: req.body.name.last_name || user_data.name?.last_name
                        } : user_data.name || { first_name: '', middle_name: '', last_name: '' }, // Provide empty name object if not provided
                        email: req.body.email || user_data.email,
                        phone_number: req.body.phone_number || user_data.phone_number,
                        gender: req.body.gender || user_data.gender,
                        token: req.body.token || user_data.token,
                        rol: req.body.rol || user_data.rol,
                        password: undefined,
                        encryptPassword: undefined,
                        validatePassword: undefined,
                    };


                    // Update user
                    await this.user_service.updateUser(user_params);
                    //get new user data
                    const new_user_data = await this.user_service.filterUser(user_filter);
                    // Send success response
                    return res.status(200).json({ data: new_user_data, message: 'Successful' });
                }
                
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        
    }
    
    public async delete_user(req: Request, res: Response) {
        try {
            
            if (req.params.id) {
                // Delete user
                const delete_details = await this.user_service.deleteUser(req.params.id);

                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
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