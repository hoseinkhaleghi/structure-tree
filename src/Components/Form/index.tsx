import { Form as AntForm, Input, Tabs, Button } from 'antd';
import ErrorBoundry from '../../ErrorBoundry';
import ActionBar from '../ActionBar';
import Accesses from './accesses';
import BasicInformation from './basic-information';
import { useEffect } from 'react';

interface Props {
  item: any;
  updateNode: (key: string, data: any) => void;
  handleAddTree: () => void;
  setNewNodeInfo: any;
  newNodeInfo: any;
  isAddingNewNode: boolean;
}

function Form({ item, updateNode, handleAddTree, setNewNodeInfo, newNodeInfo, isAddingNewNode }: Props) {
  const [form] = AntForm.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (isAddingNewNode) {
        setNewNodeInfo((prevInfo: any) => ({
          ...prevInfo,
          ...values,
        }));
        handleAddTree(); // اضافه کردن نود جدید
      } else {
        updateNode(item.key, values); // بروزرسانی نود با مقادیر جدید
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
        users: newNodeInfo.users?.map((user: { title: any; }) => user) || [],
      });
    } else {
      form.setFieldsValue({
        title: item.title || '',
        code: item.key || '',
        users: item.users?.map((user: { title: any; }) => user) || [],
      });
    }
  }, [item, form, isAddingNewNode, newNodeInfo]);

  return (
    <div className='detail'>
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className='form-content'>
              <BasicInformation initialValue={item} newNodeInfo={newNodeInfo} isAddingNewNode={isAddingNewNode} setNewNodeInfo={setNewNodeInfo} form={form} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className='form-content'>
              <ErrorBoundry>
                <Accesses initialValue={item} />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={[]} />
      <Button type="primary" onClick={handleSave}>
        {isAddingNewNode ? 'افزودن' : 'ذخیره'}
      </Button>
    </div>
  );
}

export default Form;
