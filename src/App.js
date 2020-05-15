import React, { useEffect, useState, Suspense } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Columns from 'react-columns';
import logo from './assets/loader.gif';
import Form from 'react-bootstrap/Form';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const ListItem = React.lazy(() => import('./components/ListItem'));

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

  const countries = filterCountries.map((data, i) => (
    <Suspense fallback={<div></div>}>
      <ListItem key={i} style={{ margin: "10px" }}
        img={data.countryInfo.flag}
        country={data.country}
        cases={data.cases}
        deaths={data.deaths}
        recovered={data.recovered}
        todayCases={data.todayCases}
        todayDeaths={data.todayDeaths}
        active={data.active}
        critical={data.critical}
      />
    </Suspense>
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
            onChange={e => setSearchCountries(e.target.value, e)}
          />
        </Form.Group>
      </Form>
      {err ? <div>{err}</div> : ""}
      {
        countries.length > 0 ?
          <Columns queries={queries}>
            {countries}
          </Columns>
          : <div className="text-center">
            <img src={logo} style={{ margin: "20px" }} alt="loading spinner" />
          </div>
      }
    </div>
  );
}

export default App;
