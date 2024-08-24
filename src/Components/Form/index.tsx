import { Form as AntForm, Tabs, Button } from 'antd';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import { useEffect, useState } from 'react';

interface Props {
  item: any;
  updateNode: (key: string, data: any) => void;
  handleAddTree: () => void;
  setNewNodeInfo: any;
  newNodeInfo: any;
  isAddingNewNode: boolean;
}

const Form: React.FC<Props> = ({ item, updateNode, handleAddTree, setNewNodeInfo, newNodeInfo, isAddingNewNode }) => {
  const [form] = AntForm.useForm();
  const [accesses, setAccesses] = useState<string[]>(item.accesses || []);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        ...values,
        accesses,
        users: isAddingNewNode ? newNodeInfo.users : item.users,
      };

      if (isAddingNewNode) {
        setNewNodeInfo((prevInfo: any) => ({
          ...prevInfo,
          ...updatedData,
        }));
        handleAddTree(); // نود جدید را اضافه کنید
      } else {
        updateNode(item.key, updatedData);
      }
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  useEffect(() => {
    if (isAddingNewNode) {
      form.setFieldsValue({
        title: newNodeInfo.title || '',
        code: newNodeInfo.key || '',
        users: newNodeInfo.users?.map((user: { title: any }) => user) || [],
      });
    } else {
      form.setFieldsValue({
        title: item.title || '',
        code: item.key || '',
        users: item.users?.map((user: { title: any }) => user) || [],
      });
    }
  }, [item, form, isAddingNewNode, newNodeInfo]);

  return (
    <div className='detail'>
      <div>
        <Tabs
          items={[
            {
              key: "item-1",
              label: "اطلاعات اصلی",
              children: (
                <div className='form-content'>
                  <BasicInformation
                    initialValue={item}
                    newNodeInfo={newNodeInfo}
                    isAddingNewNode={isAddingNewNode}
                    setNewNodeInfo={setNewNodeInfo}
                    form={form}
                  />
                </div>
              ),
            },
            {
              key: "item-2",
              label: "دسترسی ها",
              children: (
                <div className='form-content'>
                  <ErrorBoundry>
                    <Accesses initialValue={item} onAccessesChange={setAccesses} />
                  </ErrorBoundry>
                </div>
              ),
            },
          ]}
        />
      </div>
      <ActionBar actions={[]} />
      <Button type="primary" onClick={handleSave}>
        {isAddingNewNode ? 'افزودن' : 'ذخیره'}
      </Button>
    </div>
  );
}

export default Form;
