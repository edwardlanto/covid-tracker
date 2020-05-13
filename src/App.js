import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "./index.css";

function App() {
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
  const [latest, setLatest] = useState("");
  const [results, setResults] = useState([])
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const countries = results.map(data => (
    <Card
      bg="light"
      text="dark"
      className="text-center"
      style={{ margin: "10px" }}
    >
      <Card.Body>
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's cases{data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
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
