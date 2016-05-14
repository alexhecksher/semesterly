import update from 'react/lib/update';

export const explorationModal = (state = { isVisible: false, advancedSearchResults: [], isFetching: false, active: 0, schoolInfoLoaded: false }, action) => {
	switch (action.type) {
		case 'SHOW_EXPLORATION_MODAL':
			return Object.assign({}, state, { isVisible: true });
		case 'HIDE_EXPLORATION_MODAL':
			return Object.assign({}, state, { isVisible: false });
		case 'REQUEST_ADVANCED_SEARCH_RESULTS':
			return Object.assign({}, state, { isFetching: true });
		case 'RECEIVE_ADVANCED_SEARCH_RESULTS':
			let { advancedSearchResults } = action;
			return Object.assign({}, state, { advancedSearchResults, isFetching: false,
				active:0 });
		case 'SET_ACTIVE_RESULT':
			return Object.assign({}, state, { active: action.active });
		case 'SET_COURSE_REACTIONS':
			if (state.isVisible) {
				let advancedSearchResults = [...state.advancedSearchResults];
				advancedSearchResults[state.active]['reactions'] = action.reactions;
				return Object.assign({}, state, { advancedSearchResults });
			}
			return state;
		default:
			return state;
	}
}
