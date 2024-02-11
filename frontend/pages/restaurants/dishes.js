import { useRouter } from "next/router";
import { gql, useQuery } from '@apollo/client';
import { useState, useContext } from 'react';
import AppContext from "@/components/context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dishes({ restId }) {
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useContext(AppContext);

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

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.restaurant || !data.restaurant.data) return <p>ERROR here</p>;

  const restaurant = data.restaurant.data.attributes;
  const dishes = restaurant.dishes?.data || [];

  if (dishes.length > 0) {
    return (
      <>
        {dishes.map((dish) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={dish.id}>
            <Card style={{ margin: "0 10px" }}>
              {dish.attributes.image && dish.attributes.image.data && dish.attributes.image.data.attributes.url && (
                <CardImg
                  top={true}
                  style={{ height: 150, width: 150 }}
                  src={`http://localhost:1337` + dish.attributes.image.data.attributes.url}
                  alt={dish.attributes.name}
                />
              )}
              <CardBody>
                <CardTitle>{dish.attributes.name}</CardTitle>
                <CardText>{dish.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="info"
                  outline
                  onClick={() => addItem(dish)}
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
    return <h1> No Dishes</h1>;
  }
}

export default Dishes;
