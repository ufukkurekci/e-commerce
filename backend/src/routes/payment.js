import nanoid from "../utils/nanoid.js";
import Carts from "../db/carts";
import ApiError from "../error/ApiError";
import Session from "../middlewares/Session";
import { createPayment } from "../services/iyzico/methods/payments";
import { CompletePayment } from "../utils/payment.js";
import Iyzipay from "iyzipay";
import moment from "moment";
import Users from "../db/users.js";
import * as Cards from "../services/iyzico/methods/card.js";

export default (router) => {
    // make payment with new card
    router.post("/payments/:cartId/with-new-card",Session, async(req,res) => {
        const {card} = req.body;

        if (!card) {
            throw new ApiError("Card is req", 400 , "cardreq");
        } 

        if (!req.params?.cartId) {
            throw new ApiError("Card id is req", 400 , "cardIdreq");
        }
         const cart = await Carts.findOne({
            _id:req.params?.cartId
         }).populate("buyer").populate("products");
        if (!cart) {
            throw new ApiError("Card not found", 404 , "cardNotFound");
        }
        if (cart.completed) {
            throw new ApiError("Card is completed", 400 , "cardCompleted");
        }
        card.registerCard = "0";
        const paidPrice = cart.products.map((product) => product.price).reduce((a,b) => a+b,0);

        const data ={
            locale:req.user.locale,
            conversationId: nanoid(),
            price:paidPrice,
            paidPrice:paidPrice, // paidprice ödenmmiş olan tutar /// price sepetteki tutar 
            currency:Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId:String(cart._id), // cart => sepet
            paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard:card,
            buyer:{
                id:String(req.user._id),
                name:req.user?.name,
                surname:req.user?.surname,
                gsmNumber:req.user?.phoneNumber,
                email:req.user?.email,
                identityNumber:req.user?.identityNumber,
                lastLoginDate:moment(req.user?.updadeAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate:moment(req.user?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationAddress:req.user?.address,
                ip:req.user?.ip,
                city:req.user?.city,
                country:req.user?.country,
                zipCode:req.user?.zipCode
            },
            shippingAddress:{
                contactName: req.user?.name+ " " + req.user?.surname,
                city:req.user?.city,
                country:req.user?.country,
                address:req.user?.address,
                zipCode:req.user?.zipCode
            },
            billingAddress: {
                contactName: req.user?.name+ " " + req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode
              },
            basketItems:cart.products.map((product,index) =>{
                return {
                    id:String(product?._id),
                    name:product?.name,
                    category1:product?.categories[0],
                    category2:product?.categories[1],
                    itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                    price:product?.price
                }
            })
        }



        let result = await createPayment(data);
        console.log(result);
        await CompletePayment(result);
        res.json(result);



    }),


    //  make payment and save card
    router.post("/payments/:cartId/with-new-card/register-card",Session, async(req,res) => {
        const {card} = req.body;

        if (!card) {
            throw new ApiError("Card is req", 400 , "cardreq");
        } 

        if (!req.params?.cartId) {
            throw new ApiError("Card id is req", 400 , "cardIdreq");
        }
         const cart = await Carts.findOne({
            _id:req.params?.cartId
         }).populate("buyer").populate("products");
        if (!cart) {
            throw new ApiError("Card not found", 404 , "cardNotFound");
        }
        if (cart.completed) {
            throw new ApiError("Cart is completed", 400 , "cartCompleted");
        }
        if (req.user?.cardUserKey) {
            card.cardUserKey = req.user?.cardUserKey;
        }

        card.registerCard = "1";  // saved used card !
        const paidPrice = cart.products.map((product) => product.price).reduce((a,b) => a+b,0);

        const data ={
            locale:req.user.locale,
            conversationId: nanoid(),
            price:paidPrice,
            paidPrice:paidPrice, // paidprice ödenmmiş olan tutar /// price sepetteki tutar 
            currency:Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId:String(cart._id), // cart => sepet
            paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard:card,
            buyer:{
                id:String(req.user._id),
                name:req.user?.name,
                surname:req.user?.surname,
                gsmNumber:req.user?.phoneNumber,
                email:req.user?.email,
                identityNumber:req.user?.identityNumber,
                lastLoginDate:moment(req.user?.updadeAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate:moment(req.user?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationAddress:req.user?.address,
                ip:req.user?.ip,
                city:req.user?.city,
                country:req.user?.country,
                zipCode:req.user?.zipCode
            },
            shippingAddress:{
                contactName: req.user?.name+ " " + req.user?.surname,
                city:req.user?.city,
                country:req.user?.country,
                address:req.user?.address,
                zipCode:req.user?.zipCode
            },
            billingAddress: {
                contactName: req.user?.name+ " " + req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode
              },
            basketItems:cart.products.map((product,index) =>{
                return {
                    id:String(product?._id),
                    name:product?.name,
                    category1:product?.categories[0],
                    category2:product?.categories[1],
                    itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                    price:product?.price
                }
            })
        }


        let result = await createPayment(data);
        if (!req.user?.cardUserKey) {
            const user = await Users.findOne({_id:req.user?._id});
            user.cardUserKey = result?.cardUserKey;
            await user.save();
        }
        console.log(result);
        await CompletePayment(result);
        res.json(result);



    }),

    // make a payment with saved card => cardIndex
    router.post("/payments/:cartId/:cardIndex/with-registered-card-index",Session, async(req,res) => {
        let {cardIndex} = req.params;
        if(!cardIndex){
            throw new ApiError("cardindex not found",400,"cardIndexNotFound")
        }
        if (!req.user?.cardUserKey) {
            throw new ApiError("No registered card avaiable",400,"cardUserKeyRequired");
        }
        let cards = await Cards.getUserCards({
            locale: req.user.locale,
            conversationId: nanoid(),
            cardUserKey:req.user?.cardUserKey
        })
        let index = parseInt(cardIndex);

        if (index >= cards.cardDetails?.length) {
            throw new ApiError("card not found",400,"cardnotfound");
        }
        const {cardToken} = cards?.cardDetails[index];

        if (!req.params?.cartId) {
            throw new ApiError("Card id is req", 400 , "cardIdreq");
        }
         const cart = await Carts.findOne({
            _id:req.params?.cartId
         }).populate("buyer").populate("products");
        if (!cart) {
            throw new ApiError("Card not found", 404 , "cardNotFound");
        }
        if (cart.completed) {
            throw new ApiError("Card is completed", 400 , "cardCompleted");
        }

        const paidPrice = cart.products.map((product) => product.price).reduce((a,b) => a+b,0);

        const card = {
            cardToken,
            cardUserKey:req.user?.cardUserKey
        }
        const data ={
            locale:req.user.locale,
            conversationId: nanoid(),
            price:paidPrice,
            paidPrice:paidPrice, // paidprice ödenmmiş olan tutar /// price sepetteki tutar 
            currency:Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId:String(cart._id), // cart => sepet
            paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard:card,
            buyer:{
                id:String(req.user._id),
                name:req.user?.name,
                surname:req.user?.surname,
                gsmNumber:req.user?.phoneNumber,
                email:req.user?.email,
                identityNumber:req.user?.identityNumber,
                lastLoginDate:moment(req.user?.updadeAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate:moment(req.user?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationAddress:req.user?.address,
                ip:req.user?.ip,
                city:req.user?.city,
                country:req.user?.country,
                zipCode:req.user?.zipCode
            },
            shippingAddress:{
                contactName: req.user?.name+ " " + req.user?.surname,
                city:req.user?.city,
                country:req.user?.country,
                address:req.user?.address,
                zipCode:req.user?.zipCode
            },
            billingAddress: {
                contactName: req.user?.name+ " " + req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode
              },
            basketItems:cart.products.map((product,index) =>{
                return {
                    id:String(product?._id),
                    name:product?.name,
                    category1:product?.categories[0],
                    category2:product?.categories[1],
                    itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                    price:product?.price
                }
            })
        }



        let result = await createPayment(data);
        console.log(result);
        await CompletePayment(result);
        res.json(result);



    }),

    // make a payment with saved card => cardToken 

    router.post("/payments/:cartId/with-registered-card-token",Session, async(req,res) => {
        let {cardToken} = req.body;
        if(!cardToken){
            throw new ApiError("cardToken not found",400,"cardTokenNotFound")
        }
        if (!req.user?.cardUserKey) {
            throw new ApiError("No registered card avaiable",400,"cardUserKeyRequired");
        }

        if (!req.params?.cartId) {
            throw new ApiError("Card id is req", 400 , "cardIdreq");
        }
         const cart = await Carts.findOne({
            _id:req.params?.cartId
         }).populate("buyer").populate("products");
        if (!cart) {
            throw new ApiError("Card not found", 404 , "cardNotFound");
        }
        if (cart.completed) {
            throw new ApiError("Card is completed", 400 , "cardCompleted");
        }

        const paidPrice = cart.products.map((product) => product.price).reduce((a,b) => a+b,0);

        const card = {
            cardToken,
            cardUserKey:req.user?.cardUserKey
        }
        const data ={
            locale:req.user.locale,
            conversationId: nanoid(),
            price:paidPrice,
            paidPrice:paidPrice, // paidprice ödenmmiş olan tutar /// price sepetteki tutar 
            currency:Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId:String(cart._id), // cart => sepet
            paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard:card,
            buyer:{
                id:String(req.user._id),
                name:req.user?.name,
                surname:req.user?.surname,
                gsmNumber:req.user?.phoneNumber,
                email:req.user?.email,
                identityNumber:req.user?.identityNumber,
                lastLoginDate:moment(req.user?.updadeAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate:moment(req.user?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationAddress:req.user?.address,
                ip:req.user?.ip,
                city:req.user?.city,
                country:req.user?.country,
                zipCode:req.user?.zipCode
            },
            shippingAddress:{
                contactName: req.user?.name+ " " + req.user?.surname,
                city:req.user?.city,
                country:req.user?.country,
                address:req.user?.address,
                zipCode:req.user?.zipCode
            },
            billingAddress: {
                contactName: req.user?.name+ " " + req.user?.surname,
                city: req.user?.city,
                country: req.user?.country,
                address: req.user?.address,
                zipCode: req.user?.zipCode
              },
            basketItems:cart.products.map((product,index) =>{
                return {
                    id:String(product?._id),
                    name:product?.name,
                    category1:product?.categories[0],
                    category2:product?.categories[1],
                    itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
                    price:product?.price
                }
            })
        }



        let result = await createPayment(data);
        console.log(result);
        await CompletePayment(result);
        res.json(result);



    })

    
}