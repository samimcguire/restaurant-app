import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Dishes from "../../components/dishes";
import { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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


const RestaurantList = (props) => {
  const router = useRouter();
  const [restaurantID, setRestaurantID] = useState(null);
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
  console.log(`Query Data: ${data.restaurants}`)

  let searchQuery = data.restaurants.data.filter((res) =>{
    return res.attributes.name.toLowerCase().includes(props.search)
  })

  let restId = searchQuery[0].id

  // // definet renderer for Dishes
  // const renderDishes = (restaurantID) => {
  //   return (<Dishes restId={restaurantID}> </Dishes>)
  // };

  const handleRestaurantClick = (id) => {
    setRestaurantID(id === restaurantID ? null : id);
  };

  // const navigateToRestaurantPage = (restaurantName, restaurantId) => {
  //   router.push({
  //     pathname: `/restaurants/${encodeURIComponent(restaurantName)}`,
  //     state: { restaurantID: restaurantId },
  //   });
  // };
  

  if(searchQuery.length > 0){
    const restList = searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                top={true}
                style={{ height: 200 }}
                src={`http://localhost:1337` + res.attributes?.image.data[0].attributes.url} />
              <CardBody>
                <CardText>{res.attributes?.description[0]?.children[0]?.text}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  color="info"
                  onClick={() => {
                    handleRestaurantClick(res.id);
                    // navigateToRestaurantPage(res.attributes.name, res.id);
                  }}
                  active={restaurantID === res.id}
                >
                  {res.attributes?.name}
                </Button>
              </div>
            </Card>
          </Col>
        ));

      

  return(

    <Container>
      <Row xs='3'>
        {restList}
      </Row>
    
      <Row xs='3'>
        {restaurantID && (
            <Dishes restId={restaurantID} key={restaurantID} />
        )}
      </Row>
 
    </Container>
 
  );
} else {
  return <h1> No Restaurants Found</h1>
};
};

export default RestaurantList;
