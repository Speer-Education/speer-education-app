import ProfilePicture from '../User/ProfilePicture';
import { SearchOutlined } from '@mui/icons-material';
import React, { Dispatch, forwardRef, ForwardRefExoticComponent, SetStateAction } from 'react';
import { logEvent } from '../../utils/analytics';
import { Collapse } from '@mui/material';
import { TransitionGroup } from "react-transition-group";
import { useNavigate } from 'react-router-dom';
import { usersIndex } from '../../config/algolia';
import { FixMeLater } from '../../types/temp';
import { getMajor } from '../../utils/user';
import { UserHit } from '../../types/Algolia';

let setSearchQuery: Dispatch<SetStateAction<string>> | null = null;

const Hit = ({ hit }) => {
  const navigate = useNavigate();
  return <div className="flex flex-row space-x-2 hover:bg-blue-500 hover:bg-opacity-10 px-4 py-2 cursor-pointer" onClick={() => {
    navigate(`/profile/${hit.objectID}`)
    logEvent("clicked_on_search", {
      targetUser: hit.objectID,
    });
    if(setSearchQuery) setSearchQuery("")
  }}>
    <ProfilePicture className="h-10 w-10 rounded-full" uid={hit.objectID} thumb />
    <div className="flex-col">
      <h3 className="font-semibold">{hit.name}</h3>
      <p className="text-gray-500 text-sm">{getMajor(hit)}</p>
    </div>
  </div>
};

const Hits = ({ hits }) => (
  <div className="flex absolute flex-col mt-2 shadow-xl bg-white rounded-xl overflow-hidden min-w-[400px] max-h-[60vh] overflow-y-auto scrollbar-hide z-50">
    <TransitionGroup>
      {hits.map(hit => (
        <Collapse in key={hit.objectID}>
          <Hit hit={hit} />
        </Collapse>
      ))}
    </TransitionGroup>
  </div>
);
const SearchBar = () => {
  const [hits, setHits] = React.useState<UserHit[]>([]);
  const [search, setSearch] = React.useState<string | null>(null);

  setSearchQuery = setSearch;

  React.useEffect(() => {
    if(!search) setHits([]);
    else {
      usersIndex.search<UserHit>(search, {
        hitsPerPage: 10
      }).then(function (content) {
        setHits(content.hits)
      });
    }
  }, [search]);

  return (<div className="relative">
      <form noValidate action="" role="search">
        <div className="flex flex-row items-center w-80 bg-gray-200 text-gray-700  py-3 px-4 rounded focus:bg-gray-300 focus:border-gray-500">
          <SearchOutlined className="text-gray-500 w-8 h-8" />
          <input className="appearance-none ml-1 flex-1 border-0 leading-tight focus:outline-none bg-gray-200 ring-0 focus:border-0"
            type="input"
            id="search-box"
            autoComplete="off"
            placeholder="Search For Users"
            name="search"
            value={search || ""}
            onChange={event => setSearch(event.currentTarget.value)} 
            onFocus={() => setSearch("")}
            onBlur={() => setSearch(null)}/>
        </div>
      </form>
      <Hits hits={hits} />
    </div>)
}

export default SearchBar