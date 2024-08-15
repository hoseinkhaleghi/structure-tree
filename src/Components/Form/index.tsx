// import { Form as AntForm, Input, Tabs, Button } from 'antd';
// import ErrorBoundry from '../../ErrorBoundry';
// import ActionBar from '../ActionBar';
// import Accesses from './accesses';
// import BasicInformation from './basic-information';
// interface Props {
//   item: any;
//   updateNode: (key: string, data: any) => void;
//   handleAddTree: () => void;
// }
// function Form({ item, updateNode, handleAddTree }: Props) {
//   const [form] = AntForm.useForm(); // استفاده از Form از antd

//   const handleSave = async () => {
//     try {
//       const values = await form.validateFields(); // گرفتن مقادیر فرم
//       updateNode(item.key, values); // بروزرسانی نود با مقادیر جدید
//     } catch (error) {
//       console.error('Validation Failed:', error);
//     }
//   };
//   return (
//     <div className='detail'>
//       <div>
//         <Tabs>
//           <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
//             <div className='form-content'>
//               <BasicInformation initialValue={item} form={form} /> {/* ارسال فرم */}
//             </div>
//           </Tabs.TabPane>
//           <Tabs.TabPane tab="دسترسی ها" key="item-2">
//             <div className='form-content'>
//               <ErrorBoundry>
//                 <Accesses initialValue={item} />
//               </ErrorBoundry>
//             </div>
//           </Tabs.TabPane>
//         </Tabs>
//       </div>
//       <ActionBar actions={[]} />
//       <Button type="primary" onClick={handleSave}>ذخیره</Button> {/* دکمه ذخیره */}
//     </div>
//   );
// }
// export default Form;
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
}
function Form({ item, updateNode, handleAddTree }: Props) {
  const [form] = AntForm.useForm();

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (item.key) {
        updateNode(item.key, values); // بروزرسانی نود با مقادیر جدید
      } else {
        handleAddTree(); // اضافه کردن نود جدید
      }
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        title: item.title || '',
        code: item.key || '',
        users: item.users?.map((user: { title: any; }) => user.title).join(', ') || [],
      });
    }
  }, [item, form]);

  return (
    <div className='detail'>
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className='form-content'>
              <BasicInformation initialValue={item} form={form} />
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
        {item.key ? 'ذخیره' : 'افزودن'} {/* تغییر متن دکمه */}
      </Button>
    </div>
  );
}
export default Form;
