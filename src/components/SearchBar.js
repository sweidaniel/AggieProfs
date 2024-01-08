import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SearchBar() {
  // note: the id field is mandatory
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  

  useEffect(() => {
    Promise.all([
      fetch('/api/professors').then(res => res.json()),
      fetch('/api/courses').then(res => res.json())
    ])
    .then(([professorsData, coursesData]) => {
      const formattedProfessors = professorsData.map(prof => ({
        ...prof,
        name: `${prof.name}`,
        type: 'professor'
      }));
      const formattedCourses = coursesData.map(course => ({
        ...course,
        name: `${course.Course}`,
        type: 'course'
      }));
      setItems([...formattedProfessors, ...formattedCourses]);
    })
    .catch(error => console.error('Error fetching data: ', error));
  }, []);
  
  
  

  const handleOnSearch = (string, results) => {
    console.log(string, results);
    // if (results.length > 0) {
    //   navigate(`/professors/${results[0].id}`);
    // }
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    if (item.type === 'professor') {
      navigate(`/professors/${item._id}`);
    } else if (item.type === 'course') {
      navigate(`/courses/${item.name}`); // Adjust the route as needed
    }
  };
  

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.type === 'professor' ? `Professor: ${item.name}` : `Course: ${item.name}`}
        </span>
      </>
    )
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-bar-container">
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            fuseOptions={{
            keys: ["name"],
            threshold: 0.2,
            isCaseSensitive: false,
            shouldSort: true
            ,includeMatches: true

          }}
            autoFocus
            formatResult={formatResult}
            placeholder="Find a professor/course..."
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar