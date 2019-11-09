import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

it(`Map correctly renders after relaunch`, () => {
  const div = document.createElement(`div`);
  div.id = `map`; document.body.appendChild(div);
  const mapComponent = renderer
  .create(<Map
    pins={[]}
  />)
  .toJSON();

  expect(mapComponent).toMatchSnapshot();
});
