import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

/* 
  User info passing data
  Check if user exit
  Initialize variables and pass them into PlaceItem
  map(): data collection method that generate unique key and values should match the key
 */
const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
