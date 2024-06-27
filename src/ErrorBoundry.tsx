import React from 'react';

interface Props {
	children: JSX.Element[] | JSX.Element
}

interface State {
	hasError: boolean;
}

export default class ErrorBoundry extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
		}
	} 

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// console.log(error, errorInfo);
		this.setState({ hasError: true })
	}

	render() {
		const { hasError } = this.state
		return !hasError ? this.props.children : <h1>خطا. از devtools برای حل خطا کمک بگیرید</h1>;
	}
}