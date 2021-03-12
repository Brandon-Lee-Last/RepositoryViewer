
import React from 'react';
import renderer from 'react-test-renderer';
import fetch from 'node-fetch';

import Repos from '../components/Repos'

it('renders when there are no repos', () => {
    const tree = renderer.create(<Repos />).toJSON();
    expect(tree).toMatchSnapshot();
})

it('renders when there are repos', async () => {

    const response = await fetch('http://localhost:5000/api/fetch/repo');
    const repos = await response.json();


    const tree = renderer.create(<Repos data={repos} repoLoaded={true} />).toJSON();
    expect(tree).toMatchSnapshot();
})