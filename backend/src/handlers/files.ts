import { Router } from "express";
import express, { Request, Response } from 'express';

import path from 'path';
import platformAPIClient from "../services/platformAPIClient";



export default function mountServiceEndpoints(router: Router) {
  // handle the user auth accordingly
  router.post('/upload',async(req: Request, res: Response) => {
          // console.log(req.body.Image)
          
          const store= req.app.locals.store;
          const userCollection= req.app.locals.userCollection;
      
          // console.log(req.body)
          const auth = req.body.authRes.user.uid;
          if(auth==undefined) 
            {
              return res.json({
              success:false,
              msg:"login first"
              
            })        
          }
          let currentUser = await userCollection.findOne({ uid: auth});
          // console.log(currentUser)
          const files = req.body.files;
          if(currentUser){
                  for (const file of files) {
                      // console.log(`${file.cid} ${file.name} ${file.size}`)
                      const insertedRow = await store.insertOne({
                        uid:auth,
                        url:file.cid,
                        date: Date.now()
                    })
                    // console.log(insertedRow)
                  }
             
              res.status(200).json({
                success:true,
                msg:"successfully uploaded"
                
              })
          }
          else{
            res.status(400).json({
              success:false,
              msg:"failed to upload"
            })
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



