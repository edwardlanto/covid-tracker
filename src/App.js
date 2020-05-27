import React, { useEffect, useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Columns from 'react-columns';
import logo from './assets/loader.gif';
import Form from 'react-bootstrap/Form';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListItem from './components/ListItem'
import { useIO } from './helpers/UseIO';
import { Image } from './components/Image';

function App() {

  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const [searchCountries, setSearchCountries] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {

    //an initial load of some data
    getData();

  }, []);

  const [observer, setElements, entries] = useIO();

  useEffect(() => {
    if (results.length) {
      let img = Array.from(document.getElementsByClassName('lazy'));
      setElements(img)
    }
  }, [results, setElements]);

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    })
  }, [entries, observer]);

  async function getData() {
    try {
      const res = await axios
        .all([
          axios.get('https://corona.lmao.ninja/v2/all'),
          axios.get('https://corona.lmao.ninja/v2/countries')
        ]);

      // // Lowercasing all countries
      for (var i = 0; i < res[1].data.length; i++) {
        res[1].data[i].country = res[1].data[i].country.toLowerCase();
      }

      setLatest(res[0].data);
      setResults(res[1].data);
    } catch (err) {
      setErr(err);
      throw new Error("Image did not load");
    };
  };

  const filterCountries = results.filter(item => {
     return item.country.includes(searchCountries)
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <div key={i}>
        <Image
          src={data.countryInfo.flag}
          alt='thumbnails'
          country={data.country}
        />
        <ListItem key={i}
          img={data.countryInfo.flag}
          country={data.country}
          cases={data.cases}
          deaths={data.deaths}
          recovered={data.recovered}
          todayCases={data.todayCases}
          todayDeaths={data.todayDeaths}
          active={data.active}
          logo={logo}
          critical={data.critical}
        />
      </div>
    );
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
      <CardDeck id="card-body">
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
            onChange={e => setSearchCountries(e.target.value.toLowerCase())}
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
      <div id="footer">
      </div>
    </div>
  );
}

export default App;