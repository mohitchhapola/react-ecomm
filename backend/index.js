const mongoose = require('mongoose');
const express = require('express');
const app  = express();
const cors = require('cors')
const dotenv = require("dotenv").config();
const ProductRoutes = require("./routes/productRoutes")
const UserRoutes = require("./routes/user")
const OrderRoutes = require('./routes/order')
const CartRoutes = require('./routes/cart') 
const AuthRoutes = require('./routes/auth') 

app.use(cors())
app.use(express.json()) //to parse req.body
app.use('/api',ProductRoutes)
app.use('/api',UserRoutes)
app.use('/api',OrderRoutes)
app.use('/api',CartRoutes.router)
app.use('/api',AuthRoutes)

app.get('/',(req,res)=>{
    res.send('hello world')
    })
 
    // main().catch(err=> console.log(err))
    // async function main(){
    //     await mongoose.connect(process.env.MONGO_URI)
    //     console.log("connected")
    // }

// Payments


// This is your test secret API key.
const stripe = require("stripe")('sk_test_51N5NLVSF2Mo4AGVvozBmb6d5td4kq0lexk43naVyOdmdzLoO4g8LLDsCFc7pT08pUjBesL0G95eP8Xv95kbOaRgU00qrTMpPnY');


app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100, // for decimal compensation
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Webhook

// TODO: we will capture actual order after deploying out server live on public URL

const endpointSecret = "whsec_0e1456a83b60b01b3133d4dbe06afa98f384c2837645c364ee0d5382f6fa3ca2";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log({paymentIntentSucceeded})
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

const port = process.env.PORT || 8080;
mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(port,()=>{
                console.log(`port is running on ${port}`)
            })
            console.log("connected to database")
        })
        .catch((err)=>console.log(err))
