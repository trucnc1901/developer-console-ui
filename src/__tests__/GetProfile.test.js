import { GetProfile } from 'components/common/request/GetProfile';
import { render, screen, act } from '@testing-library/react';
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

test('fetch api fail', async () => {
  const error = { message: 'some error' };
  const promise = Promise.reject(error);
  fetch.mockReject(() => promise);
  await act(() => promise);
  // const profile = await GetProfile();
  // expect(profile).toThrowError(error);
});

test('resolves with function and timeout', async () => {
  const request = new Promise((resolve) => setTimeout(() => resolve({ body: 'ok' }), 100));
  fetch.mockResponseOnce(() => request);
  try {
    const response = await GetProfile();
    expect(response).toEqual('ok');
  } catch (e) {
    throw e;
  }
});
