import React, { useContext } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { ImageSearchContext } from "../Context/ImageContext";
function DisplayCard() {
  const { searchedImages } = useContext(ImageSearchContext);

  return (
    <Container fluid>
      <Row>
        {searchedImages &&
          searchedImages.hits?.length > 0 &&
          searchedImages.hits.map((img, k) => (
            <Col key={k} xs={12} md={4} lg={3}>
              <Card>
                <Card.Img src={img.previewURL} />
              </Card>
            </Col>
          ))}
        {searchedImages && searchedImages.hits?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No results found.</h2>
        )}
      </Row>
    </Container>
  );
}

export default DisplayCard;
