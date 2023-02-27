import React from 'react';

interface Props {
  name: string,
  description: string,
  price: number,
  onClickBuy: () => void,
}

export default function ProductCard(props: Props) {
  return (
    <>
       
  <div className="container mx-auto px-4">
    <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
      <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
        <h5 className="text-xl font-bold mb-6">Just {props.price + props.name}<br/></h5>
        <ul className="list-none footer-links">
        <div style={{ margin: 16, paddingBottom: 16, borderBottom: '1px solid gray' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>       
      <p>{props.description}</p>
      </div>
      <div style={{textAlign: 'center', marginBottom: 8}}>
              <button onClick={props.onClickBuy} 
                 className='className="appearance-none border border-gray-400 py-2 px-4 rounded text-gray-700 leading-tight focus:outline-none focus:border-gray-500 bg-white cursor-pointer"'
              ><b>1</b> PI</button>
      </div>

      
    </div>
         
        </ul>
      </div>      
    </div>
  </div>

    </>
    
  )
}