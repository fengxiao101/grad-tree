import { Component, ReactNode } from 'react';
import { isStaleChunkError, recoverFromStaleChunk } from '../utils/chunkRecovery';

interface Props { children: ReactNode }
interface State { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    recoverFromStaleChunk(error);
  }

  render() {
    if (this.state.error) {
      const staleChunk = isStaleChunkError(this.state.error);
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-xl m-4">
          <h2 className="font-bold text-red-800 mb-2">
            {staleChunk ? 'A newer version is available' : 'Render error'}
          </h2>
          {staleChunk && (
            <p className="text-sm text-red-700 mb-3">
              The planner was updated while this tab was open. Reload to use the latest version.
            </p>
          )}
          <pre className="text-xs text-red-700 whitespace-pre-wrap break-all">
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            className="mt-4 px-3 py-1.5 bg-red-600 text-white text-sm rounded"
            onClick={() => staleChunk ? window.location.reload() : this.setState({ error: null })}
          >
            {staleChunk ? 'Reload latest version' : 'Dismiss'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
