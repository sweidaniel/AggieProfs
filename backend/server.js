const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const axios = require('axios');

const uri = "mongodb+srv://aggieStudent:howdy@aggiedata.pvz7zwy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1
  }
});

app.use(cors());

let db;

// Connect to the database once at the start of the app
client.connect().then(client => {
  db = client.db("AggieProfs");
  console.log("Connected to MongoDB");
}).catch(e => {
  console.error("Failed to connect to MongoDB", e);
  process.exit(1);
});

// Get a list of all professors
app.get('/professors', async (req, res) => {
  try {
    const professors = db.collection("professors");
    const professorList = await professors.find({}).toArray();
    res.json(professorList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Get a list of all courses
app.get('/courses', async (req, res) => {
  try {
    const courses = db.collection("courses");
    const courseList = await courses.find({}).toArray();
    res.json(courseList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


// Get details for a single professor
app.get('/professors/:id', async (req, res) => {
  try {
    const professors = db.collection("professors");
    // Use `new` to create a new ObjectId instance
    const professor = await professors.findOne({ _id: new ObjectId(req.params.id) });
    
    if (!professor) {
      return res.status(404).json({ error: "Professor not found" });
    }

    res.json(professor);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Function to modify and send the request utilizing apex's http request
async function sendModifiedRequest(dept, number) {
const axios = require('axios');
let data = `dept=${dept}&number=${number}`;

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://anex.us/grades/getData/',
  headers: { 
    'host': 'anex.us', 
    'connection': 'keep-alive', 
    'content-length': '20', 
    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"', 
    'dnt': '1', 
    'sec-ch-ua-mobile': '?0', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 
    'accept': '*/*', 
    'x-requested-with': 'XMLHttpRequest', 
    'sec-ch-ua-platform': '"macOS"', 
    'origin': 'https://anex.us', 
    'sec-fetch-site': 'same-origin', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-dest': 'empty', 
    'referer': 'https://anex.us/grades/?dept=CSCE&number=314', 
    'accept-encoding': 'gzip, deflate, br', 
    'accept-language': 'en-US,en;q=0.9', 
    'cookie': '_ga=GA1.1.1157899119.1700972165; _ga_7Q5LMJ4SNL=GS1.1.1701731103.11.1.1701734039.0.0.0', 
    'dept': 'BIOL', 
    'number': '102', 
    'gradedistributions': 'https://anex.us/grades/getData/', 
    'x-postman-captr': '1444397'
  },
  data : data
};
try {
  const response = await axios.request(config);
  const dataWithNumbers = response.data.classes.map(cls => {
    const classWithNumbers = {};
    for (const [key, value] of Object.entries(cls)) {
      // Convert values to numbers if they are numeric strings, otherwise leave them as-is
      classWithNumbers[key] = isNaN(Number(value)) ? value : Number(value);
    }
    return classWithNumbers;
  });

  console.log(JSON.stringify(dataWithNumbers));
  return { ...response.data, classes: dataWithNumbers };
} catch (error) {
  console.error(error);
  throw error; // Throw the error to be handled by the caller
}


}

// Route to handle the modified request
app.get('/modifiedRequest', async (req, res) => {
  try {
    const { dept, number } = req.query; // Get parameters from query
    const data = await sendModifiedRequest(dept, number);
    res.json(data); // Send the data received from sendModifiedRequest
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});



3
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // Properly handle SIGINT (Ctrl+C) and SIGTERM (docker stop)
// process.on('SIGINT', () => client.close().then(() => process.exit(0)));
// process.on('SIGTERM', () => client.close().then(() => process.exit(0)));
