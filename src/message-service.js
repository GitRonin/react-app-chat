const axios = require('axios');

axios.get('http://localhost:3040/messages')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

// import * as axios from 'axios';

// export const getUsers = () => {
//     return axios.get('http://localhost:3040/messages')
//     .then(response => {
//         return response.data;
//     });
// }

// export default function messageService() {
//   // const a = this;
//   const request = new XMLHttpRequest();
//   request.open("GET", 'http://localhost:3040/messages', false);
//   request.onload = function jsonfunc() {
//     console.log(JSON.parse(request.response));
//     return JSON.parse(request.response);
//   }
//   request.send();
// }