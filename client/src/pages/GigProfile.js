import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

// Create a page where we display gig information
const GigProfile = () => {
  // Query for the gig
  const { loading, data } = useQuery(GET_USER);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("data", data);
  const gigs = data?.me?.gigs ?? [];

  // Display gig info
  return (
    <>
      {gigs.map((gig) => (
        <div>{gig?.title}</div>
      ))}
    </>
  );
};

export default GigProfile;
