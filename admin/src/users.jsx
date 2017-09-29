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

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <DeleteButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit title={<div />} {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

