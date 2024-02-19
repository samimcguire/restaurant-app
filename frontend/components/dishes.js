import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";

  const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                priceInCents
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function Dishes({ restId }) {
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useContext(AppContext);
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.restaurant || !data.restaurant.data) return <p>Not found</p>;

  const restaurant = data.restaurant.data;

  if (restaurant.attributes && restaurant.attributes.dishes) {
    const dishes = restaurant.attributes.dishes.data;

    if (dishes.length > 0) {
      return (
        <>
          {dishes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                {/* <CardImg
                  top={true}
                  style={{ height: 150, width: 150 }}
                  src={`http://localhost:1337${res.attributes.image?.data?.attributes?.url}`}
                /> */}
                <CardBody>
                  <CardTitle>{res.attributes.name}</CardTitle>
                  <CardText>{res.attributes.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button
                    color="info"
                    outline
                    onClick={() => addItem(res.attributes)}
                  >
                    + Add To Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </>
      );
    } else {
      return <h1>No Dishes</h1>;
    }
  } else {
    return <h1>No Dishes</h1>;
  }
}

export default Dishes;