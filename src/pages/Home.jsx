/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        // results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        <ActorGrid data={results} />
        // results.map(item => (
        //   <div key={item.person.id}>{item.person.name}</div>
        // ))
      );
    }
    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search For Something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
