import { Table } from "antd";
import { useState } from "react";

const AntTable = ({ initialValue }: any) => {
	const [checkedValues, setCheckedValues] = useState(
	  initialValue.map((node: any) => ({ value: node?.isDefault || false }))
	);
  
	const columns = [
	  {
		title: "Default",
		dataIndex: "default",
		key: "default",
		render: (text: boolean, record: any, recordIndex: number) => (
		  <input
			type="checkbox"
			checked={checkedValues[recordIndex]?.value || false}
			onChange={() => {
			  const newCheckedValues = [...checkedValues];
			  newCheckedValues[recordIndex] = {
				...newCheckedValues[recordIndex],
				value: !newCheckedValues[recordIndex]?.value || false
			  };
			  setCheckedValues(newCheckedValues);
			}}
		  />
		),
	  },
	  {
		title: "Title",
		dataIndex: "title",
		key: "title",
	  },
	];
  
	const dataSource = initialValue.map((node: any, index: number) => ({
	  default: checkedValues[index]?.value || false,
	  title: node?.title || "",
	}));
  
	return (
	  <div>
		<Table columns={columns} dataSource={dataSource} />
	  </div>
	);
  };

export default AntTable;