export enum CellActionType {
	CREATE_CELL = 'create_cell',
	MOVE_CELL = 'move_cell',
	DELETE_CELL = 'delete_cell',
	UPDATE_TEXT_CELL = 'update_text_cell',
	UPDATE_ACTIVE_TAB = 'update_active_tab',
	RESET_CELLS = 'reset_cells',
}

export enum PageActionType {
	NEW_PAGE = 'new_page',
	UPDATE_PAGE_NAME = 'update_page_name',
	REMOVE_PAGE_IMPORT = 'remove_page_import',
	ADD_PAGE_IMPORT = 'add_page_import',
}

export enum TabActionType {
	CREATE_TAB = 'create_tab',
	MOVE_TAB = 'move_tab',
	UPDATE_TAB = 'update_tab',
	DELETE_TAB = 'delete_tab',
	RESET_TABS = 'reset_tabs',
}

export enum BundleActionType {
	BUNDLE_START = 'bundle_start',
	BUNDLE_COMPLETE = 'bundle_complete',
	RESET_BUNDLES = 'reset_bundles',
}
