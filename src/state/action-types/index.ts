export enum CellActionType {
	CREATE_CELL = 'create_cell',
	LOAD_CELL = 'load_cell',
	MOVE_CELL = 'move_cell',
	DELETE_CELL = 'delete_cell',
	UPDATE_CELL = 'update_text_cell',
	RESET_CELLS = 'reset_cells',
}

export enum PageActionType {
	CREATE_PAGE = 'create_page',
	UPDATE_PAGE_NAME = 'update_page_name',
	UPDATE_SAVED_CHANGES = 'update_saved_changes',
	SAVE_PAGE = 'save_page',
	LOAD_PAGE = 'load_page',
	// --- TODO ---
	// REMOVE_PAGE_IMPORT = 'remove_page_import',
	// ADD_PAGE_IMPORT = 'add_page_import',
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
