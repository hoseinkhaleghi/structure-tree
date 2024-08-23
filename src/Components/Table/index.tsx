import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

interface AntTableProps {
  initialValue: any[];
  onUserUpdate: (updatedUsers: any[]) => void; // New prop for updating users
  setUsers:any;
  users:any;
}

const AntTable = ({ initialValue, onUserUpdate,setUsers,users }: AntTableProps) => {
    // const [users, setUsers] = useState(initialValue);
  useEffect(() => {setUsers(initialValue)
  }, [initialValue,setUsers]);

  const handleDelete = (index: number) => {
    const updatedUsers = users.filter((_: any, i: number) => i !== index);
    setUsers(updatedUsers);
    onUserUpdate(updatedUsers); // Notify parent about the updated users
  };

  const handleDefaultChange = (index: number) => {
    const updatedUsers = users.map((user: any, i: number) => ({
      ...user,
      isDefault: i === index,
    }));
    setUsers(updatedUsers);
    onUserUpdate(updatedUsers); // Notify parent about the updated users
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
          {users.map((item :any, index:any) => (
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
