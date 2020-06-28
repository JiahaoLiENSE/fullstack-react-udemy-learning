import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

/* 
    User places constant data
    useParams: make route id match the creator and display only related creator place
 */
const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Toronto Niagara Falls',
    description: 'One of the most famous falls in the world!',
    imageUrl: 'https://www.niagarafallstourism.com/site/assets/files/1/shutterstock_373218787_hornblower_rainbow.jpg',
    address: '6815 Stanley Ave, Niagara Falls, ON L2G 3Y9',
    location: {
      lat: 43.054098,
      lng: -79.2281189
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'University of Regina(UofR)',
    description: 'My Canadian University',
    imageUrl: 'https://uarctic.vps02.fwstatic.download/media/1261920/uregina-profile-11.jpg?anchor=center&mode=crop&width=1020&height=638&slimmage=true&bgcolor=fff&format=jpg&rnd=130873106210000000',
    address: '3737 Wascana Pkwy, Regina, SK S4S 0A2',
    location: {
      lat: 50.4154576,
      lng: -104.5900189
    },
    creator: 'u2'
  }
];

const UserPlaces = () => {

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;