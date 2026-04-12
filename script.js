import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    one_user_test: {
      executor: 'constant-vus',
      vus: 1,
      duration: '30s',
    },
  },
};

export default function () {
  const apiResponse = http.get('https://jsonplaceholder.typicode.com');
  const pageResponse = http.get('https://practicesoftwaretesting.com');

  check(apiResponse, {
    'API status is 200': (r) => r.status === 200,
    'API response time < 2000ms': (r) => r.timings.duration < 2000,
  });

  check(pageResponse, {
    'page status is 200': (r) => r.status === 200,
    'page response time < 2000ms': (r) => r.timings.duration < 2000,
  });
}