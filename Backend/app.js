import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Middleware setup
// const allowedOrigins = ['*']

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            console.warn(`Blocked CORS request from: ${origin}`);
            callback(new Error('CORS policy does not allow this origin.'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204 // Ensures proper handling of preflight requests
}));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// // Routes
import userroutes from "./routes/user.routes.js"

app.use("/api/v1/users", userroutes);


export { app, port };