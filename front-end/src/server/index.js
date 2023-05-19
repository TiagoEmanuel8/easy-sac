import io from 'socket.io-client';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const HOST = process.env.REACT_APP_API_HOST || 'localhost:3001';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';
const socket = io.connect(`${PROTOCOL}://${HOST}`);

export default socket;
