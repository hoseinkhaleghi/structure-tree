import { Form, Input } from "antd";
import React, { useEffect } from "react";
import UserAutoComplete from "./user-autocomplete";
import AntTable from "../Table";
interface Props {
  initialValue?: any;
  // newNodeInfo:any;
  // isAddingNewNode:boolean;
  form: any; // اضافه کردن props برای فرم
}
function BasicInformation({ initialValue, form }: Props) {
  useEffect(() => {
    if (initialValue) {
      form.setFieldsValue({
        title: initialValue.title || '',
        code: initialValue.key || '',
        users: initialValue.users?.map((user: {
          isDefault: any; title: any; 
}) => [user.title , user.isDefault]) || [],
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
      <Form.Item name="title" label="دسترسی ها" labelCol={{ span: 2 }}>
        <AntTable initialValue={initialValue?.users || []} /> 
      </Form.Item>
    </Form>
  );
}
export default BasicInformation;