import React, { useEffect, useState, Suspense } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Columns from 'react-columns';
import logo from './assets/loader.gif';
import Form from 'react-bootstrap/Form';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListItem from './components/ListItem';

function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const [searchCountries, setSearchCountries] = useState("");
  const [err, setErr] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  async function fetchStats() {
    try {
      let res = await axios
        .all([
          axios.get('https://corona.lmao.ninja/v2/all'),
          axios.get('https://corona.lmao.ninja/v2/countries')
        ]);

      // Lowercasing all countries
      for (var i = 0; i < res[1].data.length; i++) {
        res[1].data[i].country = res[1].data[i].country.toLowerCase();
      }

      setLatest(res[0].data);
      setResults(res[1].data);
    } catch (err) {
      console.log('err', err);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      console.log('handle scrolled');
    }

    setIsFetching(true);
  }

  // const filterCountries = countries.filter(item => {
  //   return item.country.includes(searchCountries)
  // });

  const countries = results.map((data, i) => {
    return (
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
    )
  });

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
      { countries }
    </div>
  );
}

export default App;
