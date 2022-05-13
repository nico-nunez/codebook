export enum CellActionType {
	CREATE_CELL = 'create_cell',
	LOAD_CELL = 'load_cell',
	MOVE_CELL = 'move_cell',
	DELETE_CELL = 'delete_cell',
	UPDATE_CELL = 'update_cell',
	RESET_CELLS = 'reset_cells',
}

export enum TabActionType {
	CREATE_TAB = 'create_tab',
	LOAD_TAB = 'load_tab',
	MOVE_TAB = 'move_tab',
	UPDATE_ACTIVE_TAB = 'update_active_tab',
	UPDATE_TAB = 'update_tab',
	DELETE_TAB = 'delete_tab',
	RESET_TABS = 'reset_tabs',
}

export enum BundleActionType {
	BUNDLE_START = 'bundle_start',
	BUNDLE_COMPLETE = 'bundle_complete',
	RESET_BUNDLES = 'reset_bundles',
}

export enum AuthActionType {
	REGISTER_USER = 'register_user',
	LOCAL_LOGIN = 'local_login',
	LOGOUT_USER = 'logout_user',
	LOGOUT_SUCCESS = 'logout_success',
	AUTHENTICATE_SESSION = 'authenticate_session',
	AUTH_SUCCESS = 'register_success',
	AUTH_FAILURE = 'auth_failure',
}

export enum ModalActionType {
	DISPLAY_MODAL = 'display_modal',
	HIDE_MODAL = 'hide_modal',
}

export enum PagesActionType {
	CREATE_PAGE = 'create_page',
	SET_CURRENT_PAGE = 'set_current_page',
	LOAD_SAVED_PAGE = 'load_saved_page',
	LOAD_SAVED_PAGES = 'load_pages',
	UPDATE_PAGE_NAME = 'update_page_name',
	UPDATE_SAVED_STATUS = 'update_saved_status',
	DELETE_PAGE = 'delete_page',
	ADD_RECENT_PAGE = 'add_recent_page',
	REMOVE_RECENT_PAGE = 'remove_recent_page',
	SET_ERROR = 'set_error',
	CLEAR_ERROR = 'clear_error',
}
