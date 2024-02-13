import { useRouter } from 'next/router';
import Dishes from '../../components/dishes';
import { Row, Container } from "reactstrap";

function Restaurant() {
  const router = useRouter();
  const restaurantName = router.query.restaurant; // Fetch restaurantName from the query parameter
  const restaurantId = router.query.restaurantId; // Access restaurantID from state
  
  const renderDishes = (restaurantId) => {
    return (<Dishes restId={restaurantId}> </Dishes>)
  };   

  return (
    <Container>
      <h1>{restaurantName}</h1>
      <h3>Dishes</h3>
        <Row xs='3'>
          {renderDishes(restaurantId)}
        </Row>
    </Container>
  );
}

export default Restaurant;
