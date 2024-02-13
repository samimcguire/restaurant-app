import { useRouter } from 'next/router';
import Dishes from '../../components/dishes';
import { Row, Container } from "reactstrap";

function Restaurant() {
  const router = useRouter();
  const restaurantName = router.query.restaurant; // Fetch restaurantName from the query parameter
  const restaurantID = router.query.state?.restaurantID; // Access restaurantID from state
  return (
    <Container>
      <h1>{restaurantName}</h1>
        <Row xs='3'>
          {restaurantID && (
              <Dishes restId={restaurantID} key={restaurantID} />
          )}
        </Row>
    </Container>
  );
}

export default Restaurant;
