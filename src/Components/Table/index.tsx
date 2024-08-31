import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

interface AntTableProps {
  initialValue: any[];
  onUserUpdate: (updatedUsers: any[]) => void;
  setUsers: any;
  users: any;
}

const AntTable: React.FC<AntTableProps> = ({ initialValue, onUserUpdate= () => {}, setUsers= () => {}, users=[] }) => {
  useEffect(() => {
    setUsers(initialValue);
  }, [initialValue, setUsers]);

  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_: any, i: number) => i !== index);
    setUsers(updatedUsers);
    onUserUpdate(updatedUsers);
  };

  const handleDefaultChange = (index: number) => {
    const updatedUsers = users.map((user: any, i: number) => ({
      ...user,
      isDefault: i === index,
    }));
    setUsers(updatedUsers);
    onUserUpdate(updatedUsers); 
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>عملیات</th>
            <th>پیش فرض</th>
            <th>نام کاربری</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item: any, index: any) => (
            <tr key={index}>
              <td onClick={() => handleDelete(index)}>
                <MdDelete />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={item.isDefault}
                  onChange={() => handleDefaultChange(index)}
                />
              </td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AntTable;
