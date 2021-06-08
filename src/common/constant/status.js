const Status = {
  ERROR_401: {
    image: '/static/images/status/error401.svg',
    title: '401: Authorization required',
    text: 'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',
  },
  ERROR_404: {
    image: '/static/images/status/error404.svg',
    title: '404: The page you are looking for isn’t here',
    text: 'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',
  },
  ERROR_500: {
    image: '/static/images/status/error500.svg',
    title: '500: Internal Server Error',
    text: 'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.',
  },
  COMING_SOON: {
    image: '/static/images/status/coming_soon.svg',
    title: 'Coming Soon',
    text: 'We are working on implementing the last features before our launch!',
  },
  MAINTENANCE: {
    image: '/static/images/status/maintenance.svg',
    title: 'The site is currently down for maintenance',
    text: 'We apologize for any inconveniences caused',
  },
};

export default Status;
