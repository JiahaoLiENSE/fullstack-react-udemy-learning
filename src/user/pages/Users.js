import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'PP LALA',
      image:
        'https://reactjs.org/logo-og.png',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;
