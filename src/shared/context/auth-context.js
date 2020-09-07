import  { createContext } from 'react';

// A context Provider for React that makes the call to your server to fetch the user as well as validates the user on every visit.
// More: https://www.npmjs.com/package/react-authentication-context

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});