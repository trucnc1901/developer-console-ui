import SettingsIcon from '@material-ui/icons/Settings';
import React, { Component } from 'react';
import { crudGetOne, MenuItemLink, UserMenu } from 'react-admin';
import { connect } from 'react-redux';

class MyUserMenuView extends Component {
  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    this.props.crudGetOne(
      // The resource
      'users',
      // The id of the resource item to fetch
      'me',
      // The base path. Mainly used on failure to fetch the data
      '/users/me',
      // Wether to refresh the current view. I don't need it here
      false
    );
  };

  render() {
    const { crudGetOne, profile, ...props } = this.props;
    console.log(this.props);
    return (
      <UserMenu label={profile ? profile.name : ''} {...props}>
        <MenuItemLink to="/users/me" primaryText="My profile" leftIcon={<SettingsIcon />} />
      </UserMenu>
    );
  }
}

const mapStateToProps = (state) => {
  const resource = 'users';
  const id = 'me';

  return {
    profile: state.admin.resources[resource] ? state.admin.resources[resource].data[id] : null,
  };
};

const MyUserMenu = connect(mapStateToProps, { crudGetOne })(MyUserMenuView);
export default MyUserMenu;
