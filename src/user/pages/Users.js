import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: "u1", 
            name: "Potter LALA", 
            image: 
                'https://media.istockphoto.com/photos/los-angeles-skyline-picture-id802758686?k=6&m=802758686&s=612x612&w=0&h=koRSF8dqM-Nsoj7Zg6a-DAn4_uvh0oh0YXdNxdbOrFo=',
            places: 3
        }
    ];

    return <UsersList  items={USERS} />;
};

export default Users;