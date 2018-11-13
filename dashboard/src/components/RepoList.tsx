import React from 'react';

import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import redux from 'redux';

import store, { storeGetRepos, Store } from '../store/store';
import { getTokenSourceMapRange } from 'typescript';

interface RepoListProps {
  repos: string[];
}
/** Provides list of available repositories */
class RepoList extends React.Component<RouteComponentProps & {repos: string[], gotRepos: boolean}|undefined> {
  /*static propTypes = {
    repos: PropTypes.array.isRequired,
    gotRepos: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };*/

  /** Renders the component
   * @return {React.ReactNode}
   */
  render(): React.ReactNode {
    if (this.props.gotRepos) {
      return (
        <List>
          {this.props.repos.map(repo =>
            <ListItem key={`repo-list-repo-${repo}`} button
              onClick={() => { this.props.history.push(`/repo/${repo}`); }}>
              <ListItemText primary={repo} />
            </ListItem>
          )}
        </List>
      );
    }

    return <div>Loading...</div>;
  }

  /** Gets executed when the component is mounted */
  componentDidMount() {
    storeGetRepos(store);
  }
}

/** Maps redux state to RepoList props
 * @param {Store} state
 * @return {Object<string, string[] | boolean}
 */
// tslint:disable-next-line:ban-types
const mapStateToProps = (state: Store): {repos: string[], gotRepos: boolean} => {
  return {
    repos: state.repos,
    gotRepos: state.gotRepos
  };
};

export default withRouter(connect(mapStateToProps, null)(RepoList));
