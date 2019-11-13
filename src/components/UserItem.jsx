import React from 'react';

const UserItem = ({name, count}) => (
  <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
    {name}
    <span className="badge badge-primary badge-pill">{count}</span>
  </li>
);

export default UserItem;