import { useEffect, useState } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { deleteEmptyChildren } from "./Components/Util/utils";
import { NodeType } from "./types";
// import { arrayBuffer } from "stream/consumers";
interface Type {
  key: string;
  children?: Type[];
}
function App() {
  const [showEdit, setShowEdit] = useState(false);
  const [treeData, setTreeData] = useState([]) as any;
  const [selectedNodeId, setSelectedNodeId] = useState([]);
  const [clipBoard, setClipBoard] = useState([]) as any;
  const [paste, setPaste] = useState({}) as any;
  const [selectedInfo, setSelectedInfo] = useState({}) as any;
  const [newNodeInfo, setNewNodeInfo] = useState({}) as any;
  const [selectedSearchResult, setSelectedSearchResult] = useState() as any;

  const selectedNodeIdString = selectedNodeId.join("");

  const fetchTreeData = async () => {
    const result: any = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    // console.log("paste : ", paste);
    // console.log("treeData : ", treeData);
    const replaceTree: any = handleUpdateTree(
      treeData,
      clipBoard?.key,
      paste?.key
    );
    // console.log("replaceTree : ", replaceTree);
    setTreeData((prevState: any) => [...prevState, replaceTree]);
  }, [paste]);
  useEffect(() => {
    console.log("new : ", newNodeInfo);
  }, [newNodeInfo]);
  console.log("selected : ", selectedInfo);

  const [maxKey, setMaxKey] = useState(0);

  const findMaxKey = (node: { key: string; children: any }) => {
    if (!node) return 0; // اگر نود وجود ندارد، 0 برگردانید
    let max = parseInt(node.key, 10); // شروع با کلید فعلی
    if (node.children) {
      for (const child of node.children) {
        const childMax = findMaxKey(child); // جستجو در فرزندان
        if (childMax > max) {
          max = childMax; // به روز رسانی بالاترین کلید
        }
      }
    }
    return max;
  };
  // useEffect(() => {
  //   const max = findMaxKey(treeData[0]); // شروع با ریشه
  //   setMaxKey(max);
  // }, [maxKey]);
  console.log("ad", maxKey);

  const handleContextMenuClick = (actionKey: any) => async () => {
    switch (actionKey) {
      case "Add":
        // console.log("Add");
        // setNewNodeInfo({
        //   key: maxKey+1,
        //   title: "",
        //   parentKey: setSelectedInfo.key,
        //   hierarchy: ["1", "2", "3", "4"],
        //   users: [],
        //   children: [],
        //   accesses: [],
        // });
        const max = findMaxKey(treeData[0]); // شروع با ریشه
        setMaxKey(max);    
        const newInfo = { ...selectedInfo };
        const lastNumber = Math.max(...newInfo.hierarchy.map(Number));
        newInfo.hierarchy.push((lastNumber + 1).toString());
        newInfo.key = (lastNumber + 1).toString();
        setNewNodeInfo(newInfo);
        break;
      case "Delete":
        setTreeData((prevResult: any) => {
          return deleteEmptyChildren(prevResult, selectedNodeIdString);
        });
        break;
      case "Paste":
        if (clipBoard.length > 0) {
          setSelectedInfo((prevState: any) => ({
            ...prevState,
            children: clipBoard,
          }));
        }

        setPaste(selectedInfo);
        // await  setTreeData((prevResult : any) => {
        //   return handleUpdateTree(treeData,clipBoard?.key , paste.key);
        // });;
        // handleUpdateTree(treeData,clipBoard?.key , paste.key)
        // handleUpdateNode(selectedNodeKey, selectedNodeIdString);
        break;
      case "Cut":
        if (selectedInfo.children.length === 0) {
          setClipBoard(selectedInfo);
        }
        break;
      default:
    }
  };
  const handleUpdateTree = (
    nodes: NodeType[],
    sourceKey: string,
    destinationKey: string
  ): NodeType[] => {
    function findAndMove(
      nodes: Type[],
      sourceKey: string,
      destinationKey: string
    ) {
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];

        if (item.key === sourceKey) {
          nodes.splice(i, 1);

          const destinationItem = findItemByKey(treeData, destinationKey);

          if (destinationItem?.children) {
            destinationItem.children.push(item);
          } else {
            console.log("شخص مورد نظر پیدا نشد");
          }

          break;
        } else if (item.children && item.children.length > 0) {
          findAndMove(item.children, sourceKey, destinationKey);
        }
      }
    }
    function findItemByKey(array: Type[], key: string): Type | null {
      for (let i = 0; i < array.length; i++) {
        const item = array[i];

        if (item.key === key) {
          return item;
        } else if (item.children) {
          const foundItem = findItemByKey(item.children, key);
          if (foundItem) {
            return foundItem;
          }
        }
      }

      return null;
    }
    findAndMove(nodes, sourceKey, destinationKey);

    return nodes;
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
            setSelectedNodeKey={setSelectedNodeId}
            setSelectedInfo={setSelectedInfo}
            handleContextMenuClick={handleContextMenuClick}
            setShowEdit={setShowEdit}
            selectedInfo={selectedInfo}
            setSelectedSearchResult={setSelectedSearchResult}
            selectedSearchResult={selectedSearchResult}
          />
        </Sidebar>
        {showEdit && <Form item={selectedInfo} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}
export default App;
