import { Input, Tabs } from 'antd';
import React from 'react';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import ArrowDownIcon from '../SvgIcons/arrow-down';
import ArrowUpIcon from '../SvgIcons/arrow-up';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import UsersList from './user-autocomplete';

interface Props {
	item: any;
	updateNode: (key: string, data: any) => void
}

function Form({ item, updateNode }: Props) {

	const handleSave = () => {
		updateNode('key', {})
	}

	return (
		<div className='detail'>
			<div>
				<Tabs >
					<Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
						<div className='form-content'>
							<BasicInformation initialValue={item?.data.basicInformation} />
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="دسترسی ها" key="item-2">
						<div className='form-content'>
							<ErrorBoundry>
								<Accesses initialValue={item?.data.accesses} />
							</ErrorBoundry>
						</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
			<ActionBar actions={[]} />
		</div>
	);
}
export default Form