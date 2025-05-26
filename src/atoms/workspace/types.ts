export const STORAGE_KEY = '@workspace_state';
export const DEFAULT_WORKSPACE_ID = '-1';

export interface WorkspaceState {
  workspaceId: string;
  rootDirId: string;
  isAdmin: boolean;
  isValidWorkspace: boolean;
  isInitialized: boolean;
}
