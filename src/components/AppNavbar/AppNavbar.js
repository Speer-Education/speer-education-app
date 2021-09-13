import { UserMenu } from './UserMenu/UserMenu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import MessageTwoToneIcon from '@material-ui/icons/MessageTwoTone';
import { Link } from 'react-router-dom';
import history from '../../hooks/history';
import searchClient from '../../config/algolia';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Configure
} from 'react-instantsearch-dom';
import ProfilePicture from '../User/ProfilePicture';
import { SearchOutlined } from '@material-ui/icons';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useRef } from 'react';

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
    history.push(`/app/profile/${hit.objectID}`)
    setSearchQuery("")
  }}>
    <ProfilePicture className="h-10 w-10 rounded-full" uid={hit.objectID} thumb/>
    <div className="flex-col">
      <h3 className="font-semibold">{hit.name}</h3>
      <p className="text-gray-500 text-sm">{hit.major}</p>
    </div>
  </div>;

const Hits = ({ hits }) => (
  <div className="hidden lg:flex absolute flex-col mt-2 border border-black shadow-xl bg-white rounded-xl overflow-hidden min-w-[400px] max-h-[60vh] overflow-y-auto scrollbar-hide">
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
        placeholder="Search"
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



/**
 * Component for the link in the navbar
 * @component
 * @param {Component} IconComponent 
 * @param {string} title
 * @param {string} href
 * @returns 
 */
const NavBarLink = ({ IconComponent, title, href }) => {
  return <Link to={href} className="text-gray-800 no-underline flex-1 lg:flex-none">
    <div className="grid place-items-center h-full lg:px-5 hover:bg-gray-100 cursor-pointer rounded-lg">
      <div className="flex-1 flex flex-col items-center">
        <IconComponent className="w-4 h-4 lg:h-8 lg:w-8" style={{ color: (href === history.location.pathname) ? '#F58A07' : '#084887' }} />
        <p className="text-xs text-center lg:text-base">{title}</p>
      </div>
    </div>
  </Link>
}

/**
 * App navbar shown to users
 * @component
 * @returns 
 */
const AppNavbar = () => {
  return (
    <div className="fixed bottom-0 lg:sticky lg:top-0 w-full justify-evenly items-center h-14 lg:p-4 lg:h-24 bg-white z-10 flex flex-row shadow-md">
      <img className="h-20 hidden lg:block cursor-pointer" src="/full-transparent-logo.png" alt="logo" onClick={() => history.push('/app')} />
      <SearchBar />
      <div className="flex flex-row h-full flex-1 lg:flex-none">
        <NavBarLink IconComponent={HomeTwoToneIcon} title="Home" href="/app" />
        <NavBarLink IconComponent={PeopleTwoToneIcon} title="New Mentors" href="/app/mentors" />
        <NavBarLink IconComponent={MessageTwoToneIcon} title="Contacts" href="/app/messages" />
        {/* <NavBarLink IconComponent={NotificationsTwoToneIcon} title="Notifications"/> */}
      </div>
      {/* <div className="hidden lg:block" >
        <Button variant="contained" color="primary" endIcon={<ArrowDropDownTwoToneIcon/>} style={{textTransform: "capitalize"}}>
          Compose a message
        </Button>
      </div> */}
      <UserMenu />
    </div>
  );
};

export default AppNavbar;
