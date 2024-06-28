import { Form, Input } from 'antd';
import React from 'react';
import UserAutoComplete from './user-autocomplete';

interface Props {
	initialValue?: any;
}

function BasicInformation({ initialValue }: Props) {
	const [form] = Form.useForm();

	return (
		<Form form={form}>
			<Form.Item initialValue={initialValue.title} name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input   value={initialValue.title}  />
				<input value={initialValue.title} />
			</Form.Item>
			{/* <p>{initialValue.title}</p> */}
			<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
				<Input defaultValue={initialValue.key} />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete  />
			</Form.Item>
		</Form>
	);
}
export default BasicInformation