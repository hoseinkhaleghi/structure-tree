import React from 'react';

interface Props {
	children: JSX.Element[] | JSX.Element
}

const Sidebar = ({children}: Props) => {
	return (
		<div className='sidebar' style={{width: '25%'}}>
			{children}
		</div>
	);
}
export default Sidebar