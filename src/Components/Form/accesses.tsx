import { useEffect, useState } from 'react';
import { getAccessList } from '../../transportLayer';
import { Checkbox } from 'antd';

interface Access {
  label: string;
  id: string;
}

interface Props {
  initialValue?: any;
  onAccessesChange: (updatedAccesses: string[]) => void;
}

function Accesses({ initialValue=[], onAccessesChange= () => {} }: Props) {
  const [options, setOptions] = useState<Access[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const fetchAccessList = async () => {
    try {
      const result: Access[] = await getAccessList();
      setOptions(result);

      // تنظیم مقادیر چک‌شده با استفاده از initialValue.accesses
      if (initialValue && initialValue.accesses) {
        setCheckedList(initialValue.accesses);
      }
    } catch (error) {
      console.error("Error fetching access list:", error);
    }
  };

  useEffect(() => {
    fetchAccessList();
  }, []);
  
  useEffect(() => {
    if (initialValue && initialValue.accesses) {
      setCheckedList(initialValue.accesses);
    }
  }, [initialValue, initialValue.accesses]);
  
const onChange = (checkedValues: any) => {
    setCheckedList(checkedValues);
    onAccessesChange(checkedValues);
};

  return (
    <>
      <h3>لیست دسترسی‌ها:</h3>
      <Checkbox.Group
        options={options.map(option => ({
          label: option.label,
          value: option.id,
        }))}
        value={checkedList}
        onChange={onChange}
      />
    </>
  );
}

export default Accesses;
