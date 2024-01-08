// api/professors.js
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://aggieStudent:howdy@aggiedata.pvz7zwy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1
  }
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db("AggieProfs");
      const professors = db.collection("professors");
      const professorList = await professors.find({}).toArray();
      res.status(200).json(professorList);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
