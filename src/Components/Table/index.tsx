import { Table } from "antd";

const AntTable = ({ initialValue }: any) => {
  const columns = [
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      render: (text: boolean) => <input type="checkbox" checked={text} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  const dataSource = initialValue.map((node: any) => ({
    default: node?.isDefault || false,
    title: node?.title || "",
  }));

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default AntTable;
