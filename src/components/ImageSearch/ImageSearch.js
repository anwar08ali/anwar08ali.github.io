import React, { useEffect, useState, useContext } from "react";
import Scroll from "../Scroll/Scroll";
import { Card, Row, Col, Container } from "react-bootstrap";
import DisplayCard from "../DisplayCard/DisplayCard";
import Form from "react-bootstrap/Form";
import { API_KEY, BASE_URL } from "../../config/config";
import { debounce } from "lodash";
import Spinner from "react-bootstrap/Spinner";
import styles from "./ImageSearch.module.css";
import { ImageSearchContext } from "../Context/ImageContext";
const ImageSearch = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setSearchedImages } = useContext(ImageSearchContext);
  const handleChange = debounce((text) => {
    setSearchField(text);
    if (text === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  }, 1000);
  const searchList = () => {
    if (searchShow) {
      if (isLoading) {
        return (
          <div className={styles.loaderWrapper}>
            <Spinner animation="border" variant="success" />
          </div>
        );
      } else {
        return (
          <Scroll>
            <div className={styles.cardWrapper}>
              <DisplayCard />
            </div>
          </Scroll>
        );
      }
    }
  };

  const getImagesAPI = async () => {
    try {
      var URL =
        BASE_URL +
        "?key=" +
        API_KEY +
        "&image_type=photo" +
        "&q=" +
        encodeURIComponent(searchField) +
        "&per_page=200";
      setIsLoading(true);
      const data = await fetch(URL)
        .then((resp) => resp.json())
        .then((res) => {
          setSearchedImages(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("API calling error:", err);

          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log("error:", error);
    }
  };
  useEffect(() => {
    if (searchField) {
      getImagesAPI();
    }
  }, [searchField]);
  return (
    <div>
      <section className={styles.searchWrapper}>
        <Container fluid>
          <Row>
            <Col>
              <div className={styles.headingWraper}>
                {/* <h3 className={styles.searchTitle}>Search Image</h3> */}
                <div className={styles.searchInput}>
                  <Form.Control
                    type="text"
                    id="inputText"
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search Images"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {searchList()}
      </section>
    </div>
  );
};

export default ImageSearch;
