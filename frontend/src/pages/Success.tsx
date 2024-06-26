import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import outdoorImg from '../assets/outdoor.jpg'
import bathroomImg from '../assets/bathroom.jpg'
import diningRoomImg from '../assets/dining room.jpg'
import bedRoomImg from '../assets/bedroom.png'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

const Success:React.FC = () => {
  const[isCartUpdated, setIsCartUpdated] = useState<boolean>(false);
  const[searchParams] = useSearchParams();
  const[success,setSuccess] = useState<string|null>();
  const[orderPlaced,setOrderPlaced] = useState<boolean>();
  const[orderId,setOrderId] = useState<number>();
  const[pageReload,setPageReload] = useState<boolean>();

  useEffect(()=>{
    
    async function checkPayment(){
      
      const success = searchParams.get('success');
      setSuccess(success);

      const customerData = localStorage.getItem('shippingData')
      if(customerData){
        const jsonData = JSON.parse(customerData);
        
        if(success==='true'){
          await axios.post(`/api/payment/success/${window.location.search}`,{
            address:jsonData
          })
          .then(response=>{
            if(response.status===200){
              setOrderPlaced(true);
              localStorage.clear();   
              setOrderId(response.data.orderId);  
            }
            else{
              setOrderPlaced(false);
            }
          })
          .catch(error=>console.log(error));
        }
        else{
          setOrderPlaced(false);
        }
      }
      else{
        setPageReload(true);
      }
    }
    checkPayment();
  },[])

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <div className="heading w-screen relative ">
            {success==='true' && orderPlaced===true &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR ORDER IS CONFIRMED</h1>
            <h1 className='capitalize text-3xl font-helvetica font-bold text-center pt-[2vw]'>your order id is {orderId}</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Thank you for shopping with us, we will process your order ASAP!</p>
            </>
            )}
            {success==='false' &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR PAYMENT FAILED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Please Try Placing your Order Again</p>
            </>
            )}
            {success==='true' && orderPlaced===false &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR ORDER COULDNT BE PROCCESSED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Please Try Placing your Order Again</p>
            </>
            )}
            {pageReload &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>Page Not Found!</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>The Page you are looking for does not exist</p>
            </>
            )}
            <div className=" w-[100vw] images relative -left-12 scroll-snap-x my-5 flex">
                <img className='w-96 rounded-3xl mx-4 my-4' src={diningRoomImg} alt="" />
                <img className='w-96 rounded-3xl mx-1 my-11' src={outdoorImg} alt="" />
                <img className='w-96 rounded-3xl mx-4 my-4' src={bedRoomImg} alt="" />
                <img className='w-96 rounded-3xl mx-1 my-11' src={bathroomImg} alt="" />
            </div>
        </div>
      
      <Footer/>
    </>
  )
}

export default Success