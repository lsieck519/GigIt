import { useQuery } from "@apollo/client";
// import { GET_USER } from "../utils/queries";
import { GET_USER_GIGS } from "../utils/queries";
import Card from "../components/Card";
import About from "../components/About";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

// Create a page where we display gig information
const GigProfile = () => {
  // Query for the gig
  const { loading, data } = useQuery(GET_USER_GIGS);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("data", data);
  const gigs = data?.me?.gigs ?? [];

  // Display gig info
  return (
    <>
      <About />
      {gigs.map((gig) => (
        <Card
          // image={cardData.image}
          title={gig.title}
          // description={cardData.description}
        />
      ))}
      <Footer />
    </>
  );
};

export default GigProfile;
