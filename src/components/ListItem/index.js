import React from 'react';
import Card from 'react-bootstrap/Card';

const ListItem = (props) => {
	const { src, country, cases, deaths, recovered, todayCases, todayDeaths, active, critical } = props;
	return (
		<Card bg="light" text="dark" className="text-center" style={{ margin: '10px' }}>
			<Card.Body>
				<img src={src} alt=""/>
				<Card.Body>
					<Card.Title className="country-title">{country}</Card.Title>
					<Card.Text>Cases {cases}</Card.Text>
					<Card.Text>Deaths {deaths}</Card.Text>
					<Card.Text>Recovered {recovered}</Card.Text>
					<Card.Text>Today's cases{todayCases}</Card.Text>
					<Card.Text>Today's deaths {todayDeaths}</Card.Text>
					<Card.Text>Active {active}</Card.Text>
					<Card.Text>Critical {critical}</Card.Text>
				</Card.Body>
			</Card.Body>
		</Card>
	);
};

export default ListItem;