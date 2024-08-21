import { Form, Input } from "antd";
import React, { useEffect } from "react";
import UserAutoComplete from "./user-autocomplete";
import AntTable from "../Table";

interface Props {
  initialValue?: any;
  newNodeInfo: any;
  isAddingNewNode: boolean;
  setNewNodeInfo:any;
  form: any; // اضافه کردن props برای فرم
}

function BasicInformation({ initialValue, form, isAddingNewNode, newNodeInfo ,setNewNodeInfo }: Props) {
  useEffect(() => {
    const values = isAddingNewNode ? newNodeInfo : initialValue;
    form.setFieldsValue({
      title: values.title || '',
      code: values.key || '',
      users: values.users?.map((user: { isDefault: any; title: any; }) => [user.title, user.isDefault]) || [],
    });
  }, [initialValue, form, newNodeInfo, isAddingNewNode]);

  // ذخیره اطلاعات وارد شده توسط کاربر در فرم
  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setNewNodeInfo((prev: any) => ({
      ...prev,
      ...values,
      
    }));
  };

  return (
    <Form form={form} onChange={isAddingNewNode ? handleFormChange : undefined}>
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
