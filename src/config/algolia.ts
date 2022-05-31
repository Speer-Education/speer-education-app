import algoliasearch from 'algoliasearch/lite';

export const ALGOLIA_APP_ID = 'PTO0LGFSZW';
export const ALGOLIA_API_KEY = '405959adb3a03a61241ccb3e68726a40'
const searchClient = algoliasearch(
    'PTO0LGFSZW',
    '405959adb3a03a61241ccb3e68726a40'
  );

export const usersIndex = searchClient.initIndex('speer_users');

export default searchClient;