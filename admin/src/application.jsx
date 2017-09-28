import React from 'react';
import 'spectre.css';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import Dashboard from './dashboard.jsx';

import { ProjectList } from './projects.jsx';
import { UserList } from './users.jsx';
import { BuildList } from './builds.jsx';
import { ArtifactList } from './artifacts.jsx';

const Application = () => (
  <Admin dashboard={Dashboard}>
    <Resource name="users" list={UserList} />
    <Resource name="projects" list={ProjectList} />
    <Resource name="builds" list={BuildList} />
    <Resource name="artifacts" list={ArtifactList} />
  </Admin>
)

export default Application;