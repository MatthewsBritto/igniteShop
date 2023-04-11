import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from 'keen-slider/react'

import Image from 'next/image'


import camiseta0 from '../assets/camisetas/camiseta0.png'
import camiseta1 from '../assets/camisetas/camiseta1.png'
import camiseta2 from '../assets/camisetas/camiseta2.png'
import camiseta3 from '../assets/camisetas/camiseta3.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";


export default function Home() {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView:3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={camiseta0}  width={520} height={400} alt=''/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta1}  width={520} height={400} alt=''/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta2} width={520} height={480}  alt=''/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={camiseta3}  width={520} height={480} alt=''/>
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const response = await stripe.products.list()

  console.log(response.data);

  return {
    props:{
      list:[1,2,3]
    }
  }
    
  
}