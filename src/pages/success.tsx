import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import  Image  from 'next/image'
import Link from "next/link";
import Stripe from "stripe";

interface SuccessPRops{
   customerName:string;
   product: {
      name:string;
      imageUrl: string;
   }
}

export default function Success({customerName, product} :SuccessPRops){
   return (
      <SuccessContainer>
         <h1>Compra Efetuada!</h1>

         <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt=""/>
         </ImageContainer>

         <p>
            Uhuuul <strong>{customerName}</strong>, sua camiseta <strong>{product.name}</strong> já está a caminho da sua casa.
         </p>

         <Link href="/">
            Voltar ao catálogo
         </Link>

      </SuccessContainer>
   )
}

export const getServerSideProps: GetServerSideProps = async ({query,params}) => {
   const sessionId = String(query.session_id)

   const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand:['line_items','line_items.data.price.product']
   })

   const customerName = session.customer_details?.name;
   const product = session.line_items?.data[0].price?.product as Stripe.Product

   return {
      props:{
         customerName,
         product: {
            name:product.name,
            imageUrl:product.images[0],
         }
      }
   }

}