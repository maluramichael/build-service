import React from 'react';
// import 'spectre.css';

import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import Dashboard from './dashboard.jsx';

import { ProjectList, ProjectCreate, ProjectEdit } from './projects.jsx';
import { UserList, UserCreate, UserEdit } from './users.jsx';
import { BuildList } from './builds.jsx';
import { ArtifactList } from './artifacts.jsx';

const Application = () => (
  <Admin dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:9000')}>
    <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} remove={Delete} />
    <Resource name="projects" list={ProjectList} create={ProjectCreate} edit={ProjectEdit} remove={Delete} />
    <Resource name="builds" list={BuildList} />
    <Resource name="artifacts" list={ArtifactList} />
  </Admin>
)

export default Application;