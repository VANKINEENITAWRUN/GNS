import redux, { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { apiGetRepos, apiGetRepoSettings } from './api';
import { Config } from './config';

export interface Store {
  repos: string[] | [];
  gotRepos: boolean;
  repoSettings: {
    [key: string]: Config;
  };
}

const defaultState = {
  repos: [],
  gotRepos: false,
  repoSettings: {}
};

const store = createStore((state, action: any) => {
  if (action.type === 'setRepos') {
    return { ...state, repos: action.repos, gotRepos: true };
  } else if (action.type === 'setRepoSettings') {
    return { ...state, repoSettings: { ...state.repoSettings, [action.repo]: action.settings } };
  }

  return state;
}, defaultState, devToolsEnhancer({}));

/** Gets repository list
 * @param {Object} passedStore
 */
export const storeGetRepos = (passedStore: redux.Store<Store>) => {
  let st = passedStore.getState();

  if (st.gotRepos) {
    return;
  }
  let repos = apiGetRepos();

  passedStore.dispatch({
    type: 'setRepos',
    repos
  });
};

/** Gets settings for the given repository
 * @param {Object} passedStore
 * @param {String} repo
 */
export const storeGetRepoSettings = (passedStore: redux.Store<Store>, repo: string) => {
  let st = passedStore.getState();

  if (st.repoSettings[repo]) {
    return;
  }
  let rs = apiGetRepoSettings(repo);

  passedStore.dispatch({
    type: 'setRepoSettings',
    repo,
    settings: rs
  });
};

export default store;
