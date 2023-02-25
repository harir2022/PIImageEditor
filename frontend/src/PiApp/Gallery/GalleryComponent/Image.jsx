import React from 'react'

function Image({Image}) {

     
const makeGatewayURL=(cid,img)=>{
     return "https://w3s.link/ipfs/"+cid+img;
}


async function getImageMetadata(cid) {
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



  return (
    <div>
                    <section class="overflow-hidden text-neutral-700">
               <div class="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
               <div class="-m-1 flex flex-wrap md:-m-2">
                    <div class="flex w-1/2 flex-wrap">
                    {
                         Image.map((cid)=>{
                              const i= getImageMetadata(cid);
                              return(
                                   <div class="w-1/2 p-1 md:p-2">
                                        <img
                                        alt="gallery"
                                        class="block h-full w-full rounded-lg object-cover object-center"
                                        src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                              </div>
                              )
                         })

                    }
                   
                    </div>
               </div>
               </div>
               </section>

    </div>
  )
}

export default Image