import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { getWord, validate } from "../services/dictionary";

function DisplayVocabulary(props) {
  const [word, setWord] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const validateWord = async () => {
      try {
        const { data } = await getWord(id);
        setWord(data[0]);
        setLoading(false);
      } catch (ex) {
        navigate("/dictionary");
      }
    };

    validateWord();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="container">
      {console.log(word)}
      <div className="m-3">
        <Container>
          <Col>
            <Row>
              <p className="fst-italic">
                View the word <span className="fw-bold">{word.word}</span> in
                English
              </p>
            </Row>
            <Row>
              <hr />
            </Row>
            <Row>
              <span className="text-uppercase fs-2 fw-bold">{word.word}</span>
            </Row>
            <Row className="d-inline">
              {word.meanings.map((m, index) => (
                <span
                  key={index}
                  className="ps-1 ms-2 fst-italic"
                >{`${m.partOfSpeech}`}</span>
              ))}
            </Row>
            <div className="mt-2">
              Pronunciation:{" "}
              <span className="badge bg-light text-dark">{word.phonetic}</span>
            </div>
            <br />
            <hr />
            <Row></Row>
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default DisplayVocabulary;
