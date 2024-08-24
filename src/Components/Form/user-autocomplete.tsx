import { AutoComplete, Button } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { getUsers } from "../../transportLayer";

interface UserAutoCompleteProps {
  onAddUser: (user: { label: string; value: string }) => void;
}

const UserAutoComplete: React.FC<UserAutoCompleteProps> = ({ onAddUser }) => {
  const orginalOptions = useRef([]) as any;
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ label: string; value: string } | null>(null);

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    });
  }, []);

  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o: { label: string | string[] }) =>
        o.label.includes(searchText)
      )
    );
  };

  const onSelect = (data: string) => {
    const user = orginalOptions.current.find((o: any) => o.value === data);
    setSelectedUser(user);
  };

  const handleAdd = () => {
    if (selectedUser) {
      onAddUser(selectedUser);
      setSelectedUser(null); // Clear selected user after adding
    }
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={handleAdd}>افزودن</Button>
    </>
  );
};

export default UserAutoComplete;
