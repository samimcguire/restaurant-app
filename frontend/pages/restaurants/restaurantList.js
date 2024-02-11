import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Dishes from "./dishes";
import { useContext, useState } from 'react';

import AppContext from "@/components/context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";


function RestaurantList(props) {
  const router =useRouter();
  const [restaurantID, setRestaurantID] = useState(null); // Change initial value to null
  const { cart } = useContext(AppContext);

  const GET_RESTAURANTS = gql`
    query Restaurant {
      restaurants {
        data {
          id
          attributes {
            name
            address
            description
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
  `;

  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  let searchQuery = data.restaurants.data.filter((res) => {
    return res.attributes.name.toLowerCase().includes(props.search.toLowerCase());
  });

  const handleRestaurantClick = (id) => {
    setRestaurantID(id === restaurantID ? null : id);
  };

  const navigateToRestaurantPage = (restaurantName) => {
    // Navigate to the restaurant page
    router.push(`/restaurants/${encodeURIComponent(restaurantName)}`);
  };

  return (
    <Container>
      <Row xs='3'>
        {searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                top={true}
                style={{ height: 200 }}
                src={`http://localhost:1337` + res.attributes.image.data[0].attributes.url}
              />
              <CardBody>
                <CardText>{res.attributes.description[0]?.children[0]?.text}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="info"
                  onClick={() => {
                    handleRestaurantClick(res.id)
                    navigateToRestaurantPage(res.attributes.name);
                  }}
                  active={restaurantID === res.id}
                >
                  {res.attributes.name}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {restaurantID && (
        <Row xs='3'>
          <Dishes restId={restaurantID} key={restaurantID} />
        </Row>
      )}
    </Container>
  );
}

export default RestaurantList;
