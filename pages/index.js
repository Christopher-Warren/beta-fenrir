import dbConnect from "../utils/dbConnect";
import Stats from "../models/Stats";

const Index = ({ stats }) => (
  <>
    <div>s</div>
  </>
);
// This code is run on the server
/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Stats.find({});
  const stats = result.map((doc) => {
    const stat = doc.toObject();
    stat._id = stat._id.toString();
    return stat;
  });

  return { props: { stats: stats } };
}

export default Index;
