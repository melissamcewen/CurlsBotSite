import React from 'react';



function ResultListing(props) {
  const list = props.list;
  const listItems = list.map((item) =>
    <li key={item.toString()}>
      {item}
    </li>
  );

  return (
    <div >
        <ul>{listItems}</ul>
    </div>
  );

}

export default ResultListing;


