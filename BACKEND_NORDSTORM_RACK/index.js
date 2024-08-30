const dotenv=require('dotenv').config()
const express=require('express');
const cors=require('cors')
const connection=require('./Config/db');
const userRouter = require('./Routes/user.routes');
const productRouter = require('./Routes/product.routes');
const dealsRouter = require('./Routes/deals.route');
const cartRouter = require('./Routes/cart.route');

const app=express();
app.use(cors({
    origin:'*'
}))
app.use(express.json())

const PORT=process.env.PORT || 6000;

app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/deals',dealsRouter)
app.use('/cart',cartRouter)

app.get('/',(req,res)=>{
try {
    res.status(200).send('Server is working Fine');
} catch (error) {
    res.status(404).send('Error while running Server');
}
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log(`Server is running at PORT ${PORT} and database is also connected `)
    } catch (error) {
        console.log(`Error while conneting to server or database ${error}`)
    }
})


