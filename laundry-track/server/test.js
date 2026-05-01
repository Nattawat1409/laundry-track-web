import express from 'express';
import cors from 'cors';


const app = express();
const port = 3000;

// give permission to access desired URL //
const corOptions = {
    origin: ['http://localhost:5173'],
}

//know which channel we give permission to access
app.use(cors(corOptions));

// do as middleware to convert raw format to json format ready to use 
app.use(express.json()); //support JSON format 

app.use(express.urlencoded({ extended: true })); //support urlencoded format 

//then post by bring data from client side
app.post('/test', (req, res) => {

    //fetch data from req.body by contain into variable ready to display 
    const { fullName, email, password, confirmPassword } = req.body;
    //same meaning
    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    console.log("Data from client is:", fullName, email, password, confirmPassword);

    res.json({
        message: "Register success!",
        data: { fullName, email }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});