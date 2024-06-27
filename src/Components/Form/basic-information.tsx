import { Form, Input } from 'antd';
import React from 'react';
import UserAutoComplete from './user-autocomplete';

interface Props {
	initialValue?: any;
}

function BasicInformation({ }: Props) {
	const [form] = Form.useForm();

	return (
		<Form form={form}>
			<Form.Item name="title" label="عنوان" labelCol={{ span: 2 }} >
				<Input />
			</Form.Item>
			<Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
				<Input />
			</Form.Item>
			<Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
				<UserAutoComplete />
			</Form.Item>
		</Form>
	);
}
export default BasicInformation