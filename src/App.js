import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "./index.css";
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';

function App() {
  useEffect(() => {
    axios
      .all([
        axios.get('https://corona.lmao.ninja/v2/all'),
        axios.get('https://corona.lmao.ninja/v2/countries')
      ])
      .then((res) => {

        // Lowercasing all countries
        for (var i = 0; i < res[1].data.length; i++) {
          res[1].data[i].country = res[1].data[i].country.toLowerCase();
        }
        console.log(res[1].data);
        setLatest(res[0].data);
        setResults(res[1].data);
      })
      .catch((err) => {
        setErr(err);
      });
  });

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const [searchCountries, setSearchCountries] = useState("");
  const [err, setErr] = useState("");

  const filterCountries = results.filter(item => {
    return item.country.includes(searchCountries)
  });

  const sortByName = () => {
    console.log(countries);
  }

  const countries = filterCountries.map((data, i) => (
    <Card
      bg="light"
      text="dark"
      className="text-center"
      key={i}
      style={{ margin: "10px" }}
    >
      <Card.Body>
        <Card.Img variant="top" src={data.countryInfo.flag} className="flag" />
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

  var queries = [{
    columns: 2,
    query: 'min-width:500px'
  }, {
    columns: 3,
    query: 'min-width:1000px'
  }];
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
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={e => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="text-center">
        <button onClick={() => sortByName()}>Sort By Name</button>
      </div>
      {err ? <div>{err}</div> : ""}
      {
        countries.length > 0 ?
          <Columns queries={queries}>
            {countries}
          </Columns>
          : <div>Loading</div>
      }


    </div>
  );
}

export default App;
