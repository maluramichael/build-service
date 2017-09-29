import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Create,
  Edit,
  TextInput,
  SimpleForm,
  EditButton,
  DeleteButton
} from 'admin-on-rest';

export const ProjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <DeleteButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const ProjectEdit = (props) => (
  <Edit title={<div />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

