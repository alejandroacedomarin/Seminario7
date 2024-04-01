import { Request, Response,NextFunction } from 'express';
import e = require('express');
var jwt = require('jsonwebtoken');
import {IUser } from '../modules/users/model';
import User from '../modules/users/schema';
import UserService from '../modules/users/service';
import Post from '../modules/posts/schema';        
import { IPost } from '../modules/posts/model';
import PostService from '../modules/posts/service';

//import { body, validationResult } from 'express-validator';



export class AuthController{
  private post_service: PostService = new PostService();
  private user_service: UserService = new UserService();

/*
     public async signin(req: Request, res: Response): Promise<Response> {
        /*const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user || !password) {
          return res.status(404).send("El email o la contraseña no existe.");
        }
        

        //else{
          try{
              const user_filter = { email: req.body.email };
              // Fetch user
              const user_data = await this.user_service.populateUserPosts(user_filter);
              console.log("User data: " + user_data);

              if(!user_data){
                return res.status(404).send({error: "El email o la contraseña no existe."});
              }
              else{

                const validPassword = await user_data.validatePassword(user_data.password);
                if (!validPassword) {
                  return res.status(401).json({ auth: false, token: null });
                }
                else{
                  const token = jwt.sign({ id: user_data._id}, 'aaaa', {
                    expiresIn: 60 * 60 * 24,             
                  });
                  console.log("TOKEN: " + token); 
                  return res.status(200).json({ auth: true, token });
                }
              }
            }
            catch(error){
              console.log(error);
              return res.status(500).json({ error: 'Internal server error' });
          }

          */
              /*
              if(user.password == password){
                  const token = jwt.sign({ id: user._id}, 'aaaa', {
                  expiresIn: 60 * 60 * 24,                  
                });
                */                   
           // }
        //}
        /*const validPassword = await user.validatePassword(password);
        if (!validPassword) {
          return res.status(401).json({ auth: false, token: null });
        }
        */
       
      public async signin(req: Request, res: Response): Promise<Response> {
          try {
              
              const user_filter = { email: req.body.email };
              const user_data = await this.user_service.populateUserPosts(user_filter);
      
              
              if (!user_data.password || !user_data.email) {
                  return res.status(404).json({ error: "El email: " + user_data.email + " o la contraseña: " + user_data.password + " es undefined." });
              }
              

              const user = new User({
                name: {
                    first_name: user_data.name.first_name,
                    middle_name: user_data.name.middle_name,
                    last_name: user_data.name.last_name
                },
                email: user_data.email,
                phone_number: user_data.phone_number,
                gender: user_data.gender,
                password: user_data.password || req.params.password,
                rol: user_data.rol
            });


              console.log("Contraseña: " + req.params.password);
              const validPassword = await user.validatePassword(req.params.password);
              if (!validPassword) {
                console.log(validPassword);
                  return res.status(401).json({error:"No valid password" });
              }
      
              const token = jwt.sign({ _id: user_data._id}, 'aaaa', {
                  expiresIn: 60 * 60 * 24,
              });
              console.log("TOKEN: " + token);
              console.log("Id: "+ user_data._id);
              return res.status(200).json({ auth: true, token });
            
            
          } catch (error) {
              console.log(error);
              return res.status(500).json({ error: 'Internal server error' });
          }
      }
      
      
      
    public async delete_user(req: Request, res: Response, next: NextFunction){
      try{
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token missing' });
        }      
        const decodedToken = jwt.verify(token, 'aaaa');
        const user = await User.findOne({ _id: decodedToken.foo });
        const userRole = user.rol;
        
        if (userRole !== "admin") {
          return res.status(403).json({ error: 'Unauthorized: Only admins can delete users' });
        }
        else return next()
  
        
    }
    catch (error) {
      // Catch and handle any errors
      return res.status(500).json({ error: 'Internal server error' });
    }
      


    }
    public async get_user(req: Request, res: Response, next: NextFunction){
      try{
        
        
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
        console.log(token);
        if (jwt.verify(token, 'aaaa')==false || !req.params.id) {
            return res.status(401).json({ error: 'Unauthorized: Token missing or id missing' });
        }
        else return next()
    }
    catch (error) {
      // Catch and handle any errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  }




    public async update_user(req: Request, res: Response, next: NextFunction){
      try{
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token missing' });
        }      
        const decodedToken = jwt.verify(token, 'aaaa');
      console.log(decodedToken.foo);
        
        if (req.params.id !== decodedToken.foo ) {
          return res.status(403).json({ error: 'Unauthorized: Only the user can update the user' });
        }
        else return next()      
    }
    catch (error) {
      // Catch and handle any errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  }




    public async delete_post(req: Request, res: Response){
      try{
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token missing' });
        }      
        const decodedToken = jwt.verify(token, 'aaaa');
        const user = await User.findOne({ _id: decodedToken.id });
        console.log(decodedToken.id);
        console.log(user);
        const userRole = user.name.first_name;
        console.log(userRole);
        /* const post = await Post.findById(req.params.id);
        const post_userId= post.author._id; */
        
        if (userRole !== "admin" /*&& post_userId !== decodedToken.foo */) {
          return res.status(403).json({ error: 'Unauthorized: Only admins can delete users' });
        }
        else {
          if (req.params.id) {
            // Delete post
            const delete_details = await this.post_service.deletePost(req.params.id);
            if (delete_details.deletedCount !== 0) {
                // Send success response if user deleted
                return res.status(200).json({ message: 'Successful'});
            } else {
                // Send failure response if user not found
                return res.status(400).json({ error: 'Post not found' });
            }
        } else {
            // Send error response if ID parameter is missing
            return res.status(400).json({ error: 'Missing Id' });
        }
        }
  
        
    }
    catch (error) {
      // Catch and handle any errors
      return res.status(500).json({ error: 'Internal server error' });
    }
      


    }
    public async create_post(req: Request, res: Response){
      try{
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token de la cabecera
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Token missing' });
        }      
        const decodedToken = jwt.verify(token, 'aaaa');
        console.log(decodedToken.id);
        console.log(req.body.author);
        if (req.body.author !== decodedToken.id ) {
          return res.status(403).json({ error: 'Unauthorized: Only the user can update the user' });
        }
        else{
          console.log("dentro  "+req.body.author);
            // this check whether all the filds were send through the request or not
            if (req.body.title && req.body.content && req.body.author){
                const post_params:IPost = {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author
                };
                const post_data = await this.post_service.createPost(post_params);
                 // Now, you may want to add the created post's ID to the user's array of posts
                await this.user_service.addPostToUser(req.body.author, post_data._id); //
                console.log("dentro  "+req.body.author);
                return res.status(201).json({ message: 'Post created successfully', post: post_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }
  
        
    }
    catch (error) {
      // Catch and handle any errors
      return res.status(500).json({ error: 'Internal server errorrrrrr' });
    }
      


    }
    //Ya existe un create_user, que es el signup
    
      public async signup(req: Request, res: Response): Promise<Response> {
        const { name: {first_name, middle_name, last_name}, email, phone_number, password,rol } = req.body;
        console.log(first_name, middle_name, last_name, email, phone_number, password);
      
        
      
      
        const user = new User({
            name: {
                first_name,
                middle_name,
                last_name
            },
            email,
            phone_number,
            password,
            rol
        });
        user.password = await user.encryptPassword(req.body.password);
        await user.save();
        console.log(user.password);
        return res.status(200).json("Registro completado, Bienvenido:" + user.name.first_name);
    }
    
}