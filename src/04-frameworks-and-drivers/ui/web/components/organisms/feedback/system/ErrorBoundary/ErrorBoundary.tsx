/** @jsxImportSource @emotion/react */
import { Component, type ErrorInfo } from 'react';
import { Box } from '../../../../atoms/Box';
import { Text } from '../../../../atoms/Text';
import { Button } from '../../../../atoms/Button';
import * as styles from './ErrorBoundary.styles';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Cập nhật state để lần render tiếp theo sẽ hiển thị UI dự phòng.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Bạn cũng có thể log lỗi này tới một dịch vụ báo cáo lỗi
    console.error("Uncaught error in component:", error, errorInfo);
    this.setState({ error });
  }

  private handleReload = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box 
          padding="xl" 
          css={styles.container}
        >
          <Text as="h3" size="lg" weight="bold">
            Component Crashed
          </Text>
          <Text size="sm" color="neutral" sx={{ margin: '8px 0 16px' }}>
            {this.props.fallbackMessage || "Đã có lỗi xảy ra khi render component này."}
          </Text>
          {this.state.error && (
            <pre css={styles.errorPre}>
              {this.state.error.toString()}
            </pre>
          )}
          <Button variant="primary" onClick={this.handleReload}>
            Tải lại trang
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}