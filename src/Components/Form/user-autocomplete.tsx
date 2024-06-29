import { AutoComplete, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getUsers } from '../../transportLayer';


const UserAutoComplete: React.FC = () => {
  const orginalOptions = useRef([]) as any
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    })
  }, []);


  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o: { label: string | string[]; }) => o.label.indexOf(searchText) > -1 )
    );
  };

  const onSelect = (data: string) => {
    // console.log('onSelect', data);
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
     <Button >افزودن</Button>
    </>
  );
};

export default UserAutoComplete;