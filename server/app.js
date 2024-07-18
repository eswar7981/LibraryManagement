const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')

const port=process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());


app.use('/get',(req,res)=>{
    res.json({status:'working'})
})





app.listen(port)