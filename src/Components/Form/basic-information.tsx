import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import UserAutoComplete from "./user-autocomplete";
import AntTable from "../Table";
import { NodeType } from "../../types";

interface Props {
  initialValue?: any;
  newNodeInfo: NodeType;
  isAddingNewNode: boolean;
  setNewNodeInfo: any;
  form: any;
}

const BasicInformation: React.FC<Props> = ({
  initialValue = [],
  form = [],
  isAddingNewNode = false,
  newNodeInfo = [],
  setNewNodeInfo = () => {},
}) => {
  const [users, setUsers] = useState(initialValue?.users || []);

  useEffect(() => {
    if (isAddingNewNode) {
      setUsers([]);
    } else {
      setUsers(initialValue?.users || []);
    }
  }, [initialValue?.users, isAddingNewNode]);

  useEffect(() => {
    const values = isAddingNewNode ? newNodeInfo : initialValue;
    form.setFieldsValue({
      title: values.title || "",
      code: values.key || "",
      users:
        values.users?.map((user: { isDefault: boolean; title: string }) => [
          user.title,
          user.isDefault,
        ]) || [],
    });
  }, [initialValue, form, newNodeInfo, isAddingNewNode]);

  const handleUserUpdate = (updatedUsers: any[]) => {
    setUsers(updatedUsers);
    if (isAddingNewNode) {
      setNewNodeInfo((prev: any) => ({
        ...prev,
        users: updatedUsers,
      }));
    } else {
      initialValue.users = updatedUsers;
    }
  };

  const handleAddUser = (newUser: { label: string; value: string }) => {
    const updatedUsers = [...users, { title: newUser.label, isDefault: false }];
    setUsers(updatedUsers);
    handleUserUpdate(updatedUsers);
  };

  return (
    <Form form={form}>
      <Form.Item name="title" label="عنوان" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="code" label="کد" labelCol={{ span: 2 }}>
        <Input />
      </Form.Item>
      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <div>
          <UserAutoComplete onAddUser={handleAddUser} />
          <AntTable
            initialValue={initialValue?.users || []}
            onUserUpdate={handleUserUpdate}
            setUsers={setUsers}
            users={users}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default BasicInformation;
