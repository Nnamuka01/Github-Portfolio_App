import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>Please try refreshing the page.</p>
                    {/* You can also log the error details */}
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;