import { Form, Input } from "antd";
import React, { useEffect } from "react";
import UserAutoComplete from "./user-autocomplete";
import AntTable from "../Table";
interface Props {
  initialValue?: any;
  form: any; // اضافه کردن props برای فرم
}
function BasicInformation({ initialValue, form }: Props) {
  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        title: initialValue.title || '',
        code: initialValue.key || '',
        users: initialValue.users?.map((user: { title: any; }) => user.title).join(', ') || [],
      });
    }
  }, [initialValue, form]);
  return (
    <Form form={form}>
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete />
      </Form.Item>
      <Form.Item name="accesses" label="دسترسی ها" labelCol={{ span: 2 }}>
        <AntTable initialValue={initialValue?.accesses || []} /> 
      </Form.Item>
    </Form>
  );
}
export default BasicInformation;