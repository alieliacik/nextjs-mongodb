import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

const HomePage = (props) => {
  return (
    <MeetupList meetups={props.meetups} />
  );
}

// export async function getServerSideProps(context) {
//   const { req, res } = context

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://Ali:Halkbank21.@cluster0.uxp5x34.mongodb.net/?retryWrites=true&w=majority')
  const db = client.db()
  const meetupCollections = db.collection('meetups')
  const meetups = await meetupCollections.find().toArray()

  return {
    props: {
      meetups: meetups.map(item => ({
        title: item.title,
        image: item.image,
        address: item.address,
        description: item.description,
        id: item._id.toString()
      }))
    },
    revalidate: 1
  }
}

export default HomePage;