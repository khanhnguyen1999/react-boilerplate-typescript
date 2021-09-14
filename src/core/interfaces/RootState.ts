export interface RootState {
  [key: string]: any;
  error: Record<string, boolean>;
  loading: Record<string, boolean>;
}
