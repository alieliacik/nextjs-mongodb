import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = ({ meetupData }) => {
  console.log(meetupData, 'asd')
  return (
    <>
      <img src={meetupData.image} alt="aa" height={200} />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.title}</address>
      <p>{meetupData.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://Ali:Halkbank21.@cluster0.uxp5x34.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db()
  const meetupCollections = db.collection('meetups')
  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray()
  client.close()
  return {
    paths: meetups.map(item => ({ params: { meetupId: item._id.toString() } })),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { params: { meetupId } } = context
  const client = await MongoClient.connect('mongodb+srv://Ali:Halkbank21.@cluster0.uxp5x34.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db()
  const meetupCollections = db.collection('meetups')
  const selectedMeetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) })
  client.close()
  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString()
      }
    }
  }
}

export default MeetupDetails;