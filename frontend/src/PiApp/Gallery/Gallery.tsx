import React from 'react'
// @ts-ignore
import { Web3Storage} from 'web3.storage/dist/bundle.esm.min.js'


const makeGatewayURL=(cid:any,img:any)=>{
     return "https://w3s.link/ipfs/"+cid+img;
}


export async function getImageMetadata(cid: any) {
     const url = makeGatewayURL(cid, 'metadata.json')
     const res = await fetch(url)
     if (!res.ok) {
       throw new Error(`error fetching image metadata: [${res.status}] ${res.statusText}`)
     }
     const metadata = await res.json()
     const gatewayURL = makeGatewayURL(cid, metadata.path)
     const uri = `ipfs://${cid}/${metadata.path}`
     console.log(uri)
     return { ...metadata, cid, gatewayURL, uri }
   }



function Gallery() {
     const url:string ="";
  return (
    <>
          <h1>Hi ther </h1>
          <img src={url}/>

          
    </>
  )
}

export default Gallery