import { useRouter } from 'next/router';
import Dishes from './dishes';
import { Row, Container } from "reactstrap";

function Restaurant() {
  const router = useRouter();
  const restaurantID = router.query.restaurant; // Fetch restaurantID from the query parameter

  return (
    <Container>
      <h1>{restaurantID}</h1>
      {restaurantID && (
        <Row xs='3'>
          <Dishes restId={restaurantID} key={restaurantID} />
        </Row>
      )}
    </Container>
  );
}

export default Restaurant;
