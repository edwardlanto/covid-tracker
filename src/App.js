import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "./index.css";

function App() {
  const [latest, setLatest] = useState();
  const [results, setResults] = useState([])
  useEffect(() => {
    axios
      .all([
        axios.get('https://corona.lmao.ninja/v2/all'),
        axios.get('https://corona.lmao.ninja/v2/countries')
      ])
      .then((res) => {
        setLatest(res[0].data);
        setResults(res[1].data)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const date = 'test'
  const lastUpdated = date.toString();

  const countries = results.map(data => (
    <Card>
      <Card.Body>
        <Card.Title>{data.country}</Card.Title>
        <Card.Text>Cases {data.cases}</Card.Text>
      </Card.Body>
    </Card>
  ));
  return (
    <div className="App">
      <CardDeck>
        <Card bg="secondary" text="white" className="text-center" style={{ margin: '10px' }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small text="white">Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text="white" className="text-center" style={{ margin: '10px' }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Death</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small text="white">Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text="white" className="text-center" style={{ margin: '10px' }}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small text="white">Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      {countries}
    </div>
  );
}

export default App;
