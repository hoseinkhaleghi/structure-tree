import { useEffect, useState } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { deleteEmptyChildren } from "./Components/Util/utils";
import { NodeType } from "./types";
// interface Type {
//   key: string;
//   children?: Type[];
// }
function App() {
  const [showEdit, setShowEdit] = useState(false);
  const [treeData, setTreeData] = useState([]) as any;
  const [selectedNodeId, setSelectedNodeId] = useState([]);
  const [clipBoard, setClipBoard] = useState([]) as any;
  const [paste, setPaste] = useState({}) as any;
  const [selectedInfo, setSelectedInfo] = useState({}) as any;
  const [newNodeInfo, setNewNodeInfo] = useState({}) as any;
  const [selectedSearchResult, setSelectedSearchResult] = useState() as any;
  const [isAddingNewNode, setIsAddingNewNode] = useState(false);

  const selectedNodeIdString = selectedNodeId.join("");

  const fetchTreeData = async () => {
    const result: any = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    if (paste?.key && clipBoard?.key) {
      const replaceTree = handleUpdateTree(treeData, clipBoard.key, paste.key);
      setTreeData((prevState: any) => [...prevState, replaceTree]);
      console.log("paste", paste);
    }
  }, [paste]);

  const findMaxKey = (node: { key: string; children: any }) => {
    if (!node) return 0;
    let max = parseInt(node.key, 10);
    if (node.children) {
      for (const child of node.children) {
        const childMax = findMaxKey(child);
        if (childMax > max) {
          max = childMax;
        }
      }
    }
    return max;
  };

  const handleContextMenuClick = (actionKey: any) => async () => {
    switch (actionKey) {
      case "Add":
        const max = findMaxKey(treeData[0]);
        const newInfo = {
          title: "",
          key: (max + 1).toString(),
          users: [],
          accesses: [],
          children: [],
          hierarchy: [...selectedInfo.hierarchy],
          parentKey: selectedInfo.key,
        };
        const lastNumber = Math.max(...selectedInfo.hierarchy.map(Number));
        newInfo.hierarchy.push((lastNumber + 1).toString());
        setNewNodeInfo(newInfo);
        setIsAddingNewNode(true);
        setShowEdit(true);
        break;
      case "Delete":
        setTreeData((prevResult: any) => {
          return deleteEmptyChildren(prevResult, selectedNodeIdString);
        });
        break;

      case "Paste":
        if (clipBoard.length > 0) {
          // const lastNumber = Math.max(...selectedInfo.hierarchy.map(Number));
          // clipBoard.hierarchy = selectedInfo.hierarchy.push((lastNumber + 1).toString());
          // clipBoard.hierarchy.push((lastNumber + 1).toString());
          setSelectedInfo((prevState: any) => ({
            ...prevState,
            children: clipBoard,
          }));
        }
        setPaste(selectedInfo);

        break;

      case "Cut":
        if (selectedInfo.children.length === 0) {
          setClipBoard(selectedInfo);
          setNewNodeInfo(null);
        }
        break;
      default:
    }
  };

  ///////////////////////////////////////// Cut And Paste

  const handleUpdateTree = (
    nodes: NodeType[],
    sourceKey: string,
    destinationKey: string
  ): NodeType[] => {
    function findAndMove(
      nodes: any,
      sourceKey: string,
      destinationKey: string
    ) {
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];

        if (item.key === sourceKey) {
          nodes.splice(i, 1);
          const destinationItem = findItemByKey(treeData, destinationKey);
          const destinationItemHierarchy = destinationItem.hierarchy;
          const maxNumber = Math.max(...destinationItemHierarchy.map(Number));
          item.hierarchy = [
            ...destinationItemHierarchy,
            (maxNumber + 1).toString(),
          ];
          item.parentKey = destinationItem.key;
          console.log("itemh", item.hierarchy, "itemp", item.parentKey);

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

    function findItemByKey(array: any, key: string): any | null {
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

  //////////////////////////////////// Add

  const addNewNode = (parentKey: string, newNodeInfo: NodeType) => {
    console.log("Adding new node to parentKey:", parentKey);
    const updatedTreeData = treeData.map(
      (node: { key: string; children: any }) => {
        if (node.key === parentKey) {
          console.log("Found parent node:", node);
          return {
            ...node,
            children: [...node.children, newNodeInfo],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: addNewNodeToChildren(
              node.children,
              parentKey,
              newNodeInfo
            ),
          };
        }
        return node;
      }
    );
    return updatedTreeData;
  };

  const addNewNodeToChildren = (
    children: any,
    parentKey: any,
    newNodeInfo: any
  ) => {
    return children.map((child: { key: any; children: any }) => {
      if (child.key === parentKey) {
        console.log("Adding new node to child:", child);
        return {
          ...child,
          children: [...child.children, newNodeInfo],
        };
      }
      if (child.children) {
        return {
          ...child,
          children: addNewNodeToChildren(
            child.children,
            parentKey,
            newNodeInfo
          ),
        };
      }
      return child;
    });
  };

  const handleAddTree = () => {
    if (newNodeInfo && newNodeInfo.title) {
      console.log("Adding new node with info:", newNodeInfo);
      const updatedTreeData = addNewNode(newNodeInfo.parentKey, newNodeInfo);
      console.log("Tree data after adding node:", updatedTreeData);
      setTreeData(updatedTreeData);
      setShowEdit(false);
      setNewNodeInfo({});
    }
  };

  const handleUpdateNode = (key: string, newData: any) => {
    setTreeData((prevData: any) => {
      const updateNode = (data: any) => {
        return data.map((node: { key: string; children: any }) => {
          if (node.key === key) {
            return { ...node, ...newData };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      return updateNode(prevData);
    });
  };

  // console.log("tree",treeData)
  // console.log("sel",selectedInfo)
  // console.log("new",newNodeInfo)
  // console.log("add",isAddingNewNode)
  // console.log("max",maxKey,typeof maxKey)
  // console.log("SelectedNodeKey" , selectedNodeId)
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
            setNewNodeInfo={setNewNodeInfo}
            isAddingNewNode={isAddingNewNode}
            setIsAddingNewNode={setIsAddingNewNode}
          />
        </Sidebar>
        {showEdit && (
          <Form
            item={selectedInfo}
            updateNode={handleUpdateNode}
            handleAddTree={handleAddTree}
            setNewNodeInfo={setNewNodeInfo}
            newNodeInfo={newNodeInfo}
            isAddingNewNode={isAddingNewNode}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}
export default App;
