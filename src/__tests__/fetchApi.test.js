import { httpClient } from 'common/utils/request/common';

beforeEach(() => {
  fetch.resetMocks();
});

test('fetch api correctly', async () => {
  fetch.mockResponseOnce(JSON.stringify({ name: 'Leanne Graham' }));
  const profile = await httpClient('https://jsonplaceholder.typicode.com/users/1').then(({ json }) => {
    return json.name;
  });
  expect(profile).toEqual('Leanne Graham');
  expect(fetch).toHaveBeenCalledTimes(1);
});

// test('returns null when exception', async () => {
//   fetch.mockImplementationOnce(() => Promise.reject('API is down'));
//   const url = 'https://jsonplaceholder.typicode.com/users/1';
//   const request = await httpClient(url).then(({ json }) => {
//     return json;
//   });
//   expect(request).toEqual(null);
// });

test('should test httpClient correct', async () => {
  fetch.mockResponseOnce(JSON.stringify({ name: 'Leanne Graham', age: '20' }));
  const url = 'https://jsonplaceholder.typicode.com/users';
  const request = await httpClient(url).then(({ json }) => ({
    data: json,
  }));
  expect(request).toEqual({ data: { name: 'Leanne Graham', age: '20' } });
});
