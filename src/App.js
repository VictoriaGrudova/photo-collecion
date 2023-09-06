import React, { useEffect, useState } from 'react';
import { Collection } from './Collection';
import './index.scss';

const cats = [
  { "name": "All" },
  { "name": "Sea" },
  { "name": "Mountains" },
  { "name": "Architecture" },
  { "name": "Cities" }
];

function App() {
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [categoriesId, setCategoriesId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://64f22b280e1e60602d24d894.mockapi.io/photo-collection?page=${page}&limit=6&${categoriesId ? `category=${categoriesId}` : ''}`)
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  },[categoriesId,page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((cat, indx) => (
            <li 
            onClick={() => setCategoriesId(indx)}
            className={categoriesId === indx ? 'active' : ''}
            key={cat.name}>{cat.name}</li>
          ))}
        </ul>
        <input 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="input" placeholder="Search by title..." />
      </div>
      <div className="content">
        {
          isLoading ? <h2>Loading ...</h2> :
          collections.filter((collection) => {
            return collection.name.toLowerCase().includes(searchValue.toLowerCase())
          }).map((collection) => (
            <Collection
            key={collection.name}
            name={collection.name}
            images={
             collection.photos
            }
            />
          ))
        }
      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((_, i) => <li
           key={i} 
           onClick={() => setPage(i+1)}
           className={i+1 === page? 'active' : ''}
          >{i + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
