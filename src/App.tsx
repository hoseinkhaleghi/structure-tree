import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { deleteEmptyChildren } from "./Components/Util/utils";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState([]);
  const [clipBoard, setClipBoard] = useState(null);

  // const selectedClipboard = cutEmptyChildren

  const selectedNodeIdString = selectedNodeId.join("");
  // console.log(selectedNodeIdString);

  const fetchTreeData = async () => {
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);
  // const handleCut = ()=>{setClipBoard(cutEmptyChildren)}

  const handleContextMenuClick = (actionKey: any) => () => {
    switch (actionKey) {
      case "Add":
        console.log("Add");
        break;
      case "Delete":
        setTreeData((prevResult) => {
          return deleteEmptyChildren(prevResult, selectedNodeIdString);
        });
        break;
      case "Paste":
        console.log("Paste");
        // handleUpdateNode(selectedNodeKey, selectedNodeIdString);
        break;
      case "Cut":
        // setClipBoard(cutEmptyChildren)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // (()=>{handleCut})
        console.log(clipBoard);

        break;
      default:
        console.log("not");
    }
  };
  // const handleUpdateTree = (nodes: NodeType[]) => {};
  const handleUpdateTree = (nodes: NodeType[]) => {
    setTreeData(nodes);
  };

  const handleUpdateNode = (key: string, data: any) => {
    // const updatedTreeData = [...treeData];
    // اضافه کردن داده جدید به شاخه جدید
    // حذف شاخه از جای قبلی
    // setTreeData(updatedTreeData);
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App" dir="rtl">
        <Sidebar>
          <ExtendedTree
            onDelete={setSelectedNodeId}
            onCut={setClipBoard}
            handleContextMenuClick={handleContextMenuClick}
            onSelect={setSelectedItem}
            // setSelectedNodeKey={setSelectedNodeKey}
          />
        </Sidebar>
        {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}
export default App;
