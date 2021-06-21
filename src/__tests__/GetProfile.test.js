import { GetProfile } from 'components/common/request/GetProfile';

beforeEach(() => {
  fetch.resetMocks();
});

test('fetch api correctly', async () => {
  fetch.mockResponseOnce(
    JSON.stringify({ id: '10', name: 'Leanne Graham', avatar: 'image', email: 'trucn@gmail.com' })
  );
  const profile = await GetProfile().then((data) => {
    return data.name;
  });
  expect(profile).toEqual('Leanne Graham');
});
