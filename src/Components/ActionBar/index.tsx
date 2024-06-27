import React from 'react';
interface ActionType {
	title: string;
	handler: () => void;
}

interface Props {
	actions: ActionType[];
}

function ActionBar({ actions }: Props) {
	return <div className='actionbar' >
		{/* 
	Display actions
 */}
	</div>;
}
export default ActionBar