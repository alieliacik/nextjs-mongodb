import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const client = await MongoClient.connect('mongodb+srv://Ali:Halkbank21.@cluster0.uxp5x34.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()

    const meetupCollections = db.collection('meetups')
    const result = await meetupCollections.insertOne(req.body)
    console.log(result)
    client.close()

    res.status(201).json({ message: 'Meetup inserted!' })
  }
}

export default handler