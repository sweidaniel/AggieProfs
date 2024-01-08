const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

// MongoDB URI and Client Setup
const uri = "mongodb+srv://aggieStudent:howdy@aggiedata.pvz7zwy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1 } });

async function getProfessorById(professorId) {
    await client.connect();
    const db = client.db("AggieProfs");
    const professors = db.collection("professors");
    return await professors.findOne({ _id: new ObjectId(professorId) });
}

module.exports = async (req, res) => {
    const professorId = req.query.id;

    if (!professorId) {
        return res.status(400).json({ error: "Missing professor ID" });
    }

    try {
        const professor = await getProfessorById(professorId);

        if (!professor) {
            return res.status(404).json({ error: "Professor not found" });
        }

        res.json(professor);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    } finally {
        await client.close();
    }
};
