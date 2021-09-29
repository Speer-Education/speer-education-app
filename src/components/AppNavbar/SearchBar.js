import history from '../../hooks/history';
import searchClient from '../../config/algolia';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Configure
} from 'react-instantsearch-dom';
import ProfilePicture from '../User/ProfilePicture';
import { SearchOutlined } from '@mui/icons-material';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useRef } from 'react';
import { logEvent } from '../../utils/analytics';

const userSearchClient = {
  ...searchClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return searchClient.search(requests);
  },
}

let setSearchQuery = null;

const Hit = ({ hit }) => <div className="flex flex-row space-x-2 hover:bg-blue-500 hover:bg-opacity-10 px-4 py-2 cursor-pointer" onClick={() => {
    history.push(`/profile/${hit.objectID}`)
    logEvent("clicked_on_search", {
      targetUser: hit.objectID,
    });
    setSearchQuery("")
  }}>
    <ProfilePicture className="h-10 w-10 rounded-full" uid={hit.objectID} thumb/>
    <div className="flex-col">
      <h3 className="font-semibold">{hit.name}</h3>
      <p className="text-gray-500 text-sm">{hit.major}</p>
    </div>
  </div>;

const Hits = ({ hits }) => (
  <div className="hidden lg:flex absolute flex-col mt-2 shadow-xl bg-white rounded-xl overflow-hidden min-w-[400px] max-h-[60vh] overflow-y-auto scrollbar-hide">
    {hits.map(hit => (
      <Hit hit={hit} key={hit.objectID}/>
    ))}
  </div>
);

const SearchBox = ({ currentRefinement, refine }) => {
  setSearchQuery = refine;
  return <form noValidate action="" role="search">
    <div className="hidden lg:flex flex-row items-center w-80 bg-gray-200 text-gray-700  py-3 px-4 rounded focus:bg-gray-300 focus:border-gray-500">
      <SearchOutlined className="text-gray-500 w-8 h-8" />
      <input className="appearance-none ml-1 flex-1 border-0 leading-tight focus:outline-none bg-gray-200 ring-0 focus:border-0"
        type="input"
        id="search-box"
        autoComplete="off"
        placeholder="Search For Users"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)} />
    </div>
  </form>
};

const CustomHits = connectHits(Hits);
const CustomSearchBox = connectSearchBox(SearchBox);
const SearchBar = () => {
  const searchRef = useRef();
  useOnClickOutside(searchRef, () => setSearchQuery("")); 

  return <InstantSearch indexName="speer_users" searchClient={userSearchClient} >
    <div className="relative" ref={searchRef}>
      <CustomSearchBox/>
      <Configure hitsPerPage={6} />
      <CustomHits hitComponent={Hit} />
    </div>
  </InstantSearch>
}

export default SearchBar