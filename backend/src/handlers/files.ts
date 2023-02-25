import { Router } from "express";
import express, { Request, Response } from 'express';

import path from 'path';
import platformAPIClient from "../services/platformAPIClient";

import cloudinary from 'cloudinary';




const cloudinaryUploader = async(auth:string,image:string)=>{
  // Upload

      const res = await  cloudinary.v2.uploader.upload( image,{
        folder: auth,
      })
      return res;
}


export default function mountServiceEndpoints(router: Router) {
  // handle the user auth accordingly
  router.post('/upload',async(req: Request, res: Response) => {

        const auth = req.body.uid
        if(!auth && auth==undefined) 
          {
            console.log("login first")
            return res.json({
            success:false,
            msg:"login first"              
          })        
        }
        const store= req.app.locals.store;
        const userCollection= req.app.locals.userCollection;
    
        // const url="asdf";
         const cloud=  await cloudinaryUploader(auth,req.body.image);
         const imageObject= {
             url: cloud.url,
             name:req.body.imageName
        }
          
          // console.log(req.body.uid)
     
          let currentUser = await userCollection.findOne({ uid: auth});
          // console.log(currentUser)
      
          try {
            const insertedRow = await store.insertOne({
              uid:auth,
              image: imageObject,
              date: Date.now()
          })
          console.log("inserted a row ")
          console.log(insertedRow)
       
        res.status(200).json({
          success:true,
          msg:"successfully uploaded"
          
        })
            
          } catch (error) {
            console.log(error)
          }
          
          
   });

  // handle the user auth accordingly
  router.get('/list', async (req: Request, res: Response) => {
    
    const userCollection= req.app.locals.userCollection;
    
    let users: any[]=[];
    const result= await userCollection.find({}).toArray().then((d:any)=>{
      for(var ch of d)      {
        users.push({
          uid:ch.uid,
          username:ch.username
        });
      }
    })

    // console.log(users)

   return  res.status(200).json({
      success:true,
      users
    })
  });





  // share docs 
  // fromId:string,
    // toId:string,
    // date:Timestamp,
    // url:string,
    // access:Boolean
  router.post('/share',async(req:Request , res:Response)=>{
        const users= req.body.users;
        const owner= req.body.authRes.user.uid;
        const sharedCollection = req.app.locals.sharedCollection;
        const url = req.body.url;

         for(var user of users){
          const result = await sharedCollection.insertOne({
            fromId:owner,
            toId:user,
            date:Date.now(),
            url:url,
            access:0
          })
         }

         res.status(200).json({
          success:true
         })
  })


  //get images for viewing
  router.get('/inbox' ,async (req:Request,res:Response)=>{
      const auth = req.body.authRes.user.uid;
        const sharedCollection = req.app.locals.sharedCollection;
      const images:any[]=[];
        const result = await sharedCollection.find({toId:auth}) .toArray().then((d:any)=>{
              for(var ch of d){
                images.push(ch.url);
              }
        })
        // console.log(images)
        res.status(200).json({
          success:true,
          images
        })
  })



}



