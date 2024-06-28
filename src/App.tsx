// import { useEffect, useContext, useState, useMemo } from "react";
// import AppContext from "./appContext";
// import Form from "./Components/Form";
// import Sidebar from "./Components/Sidebar";
// import ExtendedTree from "./Components/Tree";
// import { getNodes } from "./transportLayer";
// import { deleteEmptyChildren } from "./Components/Util/utils";
// import { NodeType } from "./types";

// function App() {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [treeData, setTreeData] = useState([]);
//   const [selectedNodeId, setSelectedNodeId] = useState([]);
//   const [clipBoard, setClipBoard] = useState(null);

//   // const selectedClipboard = cutEmptyChildren

//   const selectedNodeIdString = selectedNodeId.join("");
//   console.log(selectedItem);

//   const fetchTreeData = async () => {
//     const result = await getNodes();
//     setTreeData(result);
//   };

//   useEffect(() => {
//     fetchTreeData();
//   }, []);
//   // const handleCut = ()=>{setClipBoard(cutEmptyChildren)}

//   const handleContextMenuClick = (actionKey: any) => () => {
//     switch (actionKey) {
//       case "Add":
//         console.log("Add");
//         break;
//       case "Delete":
//         setTreeData((prevResult) => {
//           return deleteEmptyChildren(prevResult, selectedNodeIdString);
//         });
//         break;
//       case "Paste":
//         console.log("Paste");
//         // handleUpdateNode(selectedNodeKey, selectedNodeIdString);
//         break;
//       case "Cut":
//         // setClipBoard(cutEmptyChildren)
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         // (()=>{handleCut})
//         console.log(clipBoard);

//         break;
//       default:
//         console.log("not");
//     }
//   };
//   // const handleUpdateTree = (nodes: NodeType[]) => {};
//   const handleUpdateTree = (nodes: NodeType[]) => {
//     setTreeData(nodes);
//   };

//   const handleUpdateNode = (key: string, data: any) => {
//     // const updatedTreeData = [...treeData];
//     // اضافه کردن داده جدید به شاخه جدید
//     // حذف شاخه از جای قبلی
//     // setTreeData(updatedTreeData);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         treeData,
//         updateTreeData: handleUpdateTree,
//       }}
//     >
//       <div className="App" dir="rtl">
//         <Sidebar>
//           <ExtendedTree
//             onDelete={setSelectedNodeId}
//             onCut={setClipBoard}
//             handleContextMenuClick={handleContextMenuClick}
//             onSelect={setSelectedItem}
//             setShowEdit={setShowEdit}
//             // setSelectedNodeKey={setSelectedNodeKey}
//           />
//         </Sidebar>
//         {showEdit && <Form item={selectedItem} updateNode={handleUpdateNode} />}
//       </div>
//     </AppContext.Provider>
//   );
// }
// export default App;

import { useEffect, useContext, useState, useMemo, Children } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { deleteEmptyChildren } from "./Components/Util/utils";
import { NodeType } from "./types";
import { arrayBuffer } from "stream/consumers";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]) as any;
  const [selectedNodeId, setSelectedNodeId] = useState([]);
  const [clipBoard, setClipBoard] = useState([]) as any;
  const [paste, setPaste] = useState({}) as any;
  const [selectedInfo, setSelectedInfo] = useState({}) as any;

  ///////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////

  // const selectedClipboard = cutEmptyChildren

  const selectedNodeIdString = selectedNodeId.join("");
  // console.log(selectedNodeIdString);

  const fetchTreeData = async () => {
    const result: any = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    console.log("paset : ", paste);
    console.log("treeData : ", treeData);

    const datatreeeee: any = handleUpdateTree(
      treeData,
      clipBoard?.key,
      paste?.key
    );
    console.log("datatreeeee : ", datatreeeee);

    // true solution
    setTreeData((prevState: any) => [...prevState, datatreeeee]);

    //false solution
    // setTreeData(datatreeeee)
  }, [paste]);
  // const handleCut = ()=>{setClipBoard(cutEmptyChildren)}

  const handleContextMenuClick = (actionKey: any) => async () => {
    switch (actionKey) {
      case "Add":
        console.log("Add");
        break;

      case "Delete":
        setTreeData((prevResult: any) => {
          return deleteEmptyChildren(prevResult, selectedNodeIdString);
        });
        break;

      case "Paste":
        setSelectedInfo((prevState: any) => ({
          ...prevState,
          children: clipBoard,
        }));

        setPaste(selectedInfo);
        //   setTreeData([
        //     {
        //         "key": "1",
        //         "title": "شرکت چارگون",
        //         "users": [],
        //         "children": [
        //             {
        //                 "key": "2",
        //                 "title": "یاور کاردوست(مدیرعامل)",
        //                 "parentKey": "1",
        //                 "hierarchy": [
        //                     "1",
        //                     "2"
        //                 ],
        //                 "users": [
        //                     {
        //                         "title": "superadmin",
        //                         "isDefault": true
        //                     }
        //                 ],
        //                 "accesses": [],
        //                 "children": [
        //                     {
        //                         "key": "3",
        //                         "title": "محسن پاکدل(مدیرفنی)",
        //                         "parentKey": "2",
        //                         "hierarchy": [
        //                             "1",
        //                             "2",
        //                             "3"
        //                         ],
        //                         "users": [
        //                             {
        //                                 "title": "admin",
        //                                 "isDefault": true
        //                             }
        //                         ],
        //                         "children": [
        //                             {
        //                                 "key": "4",
        //                                 "title": "علیرضا گلزاده(کارشناس رابط کاربری)",
        //                                 "parentKey": "3",
        //                                 "hierarchy": [
        //                                     "1",
        //                                     "2",
        //                                     "3",
        //                                     "4"
        //                                 ],
        //                                 "users": [
        //                                     {
        //                                         "title": "alireza",
        //                                         "isDefault": true
        //                                     },
        //                                     {
        //                                         "title": "alirezatest",
        //                                         "isDefault": false
        //                                     }
        //                                 ],
        //                                 "children": [
        //                                     {
        //                                         "key": "8",
        //                                         "title": "حسین خالقی",
        //                                         "parentKey": "3",
        //                                         "hierarchy": [
        //                                             "1",
        //                                             "2",
        //                                             "3",
        //                                             "4"
        //                                         ],
        //                                         "users": [
        //                                             {
        //                                                 "title": "alireza",
        //                                                 "isDefault": true
        //                                             },
        //                                             {
        //                                                 "title": "alirezatest",
        //                                                 "isDefault": false
        //                                             }
        //                                         ],
        //                                         "children": [],
        //                                         "accesses": []
        //                                     }
        //                                 ],
        //                                 "accesses": []
        //                             }
        //                         ],
        //                         "accesses": []
        //                     }
        //                 ]
        //             }
        //         ],
        //         "accesses": [],
        //         "parentKey": "0",
        //         "hierarchy": []
        //     }
        // ])
        // await  setTreeData((prevResult : any) => {
        //   return handleUpdateTree(treeData,clipBoard?.key , paste.key);

        // });;

        // handleUpdateTree(treeData,clipBoard?.key , paste.key)
        // handleUpdateNode(selectedNodeKey, selectedNodeIdString);

        break;
      case "Cut":
        // setClipBoard(cutEmptyChildren)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // (()=>{handleCut})
        // if (selectedInfo.children.length === 0) {

        setClipBoard(selectedInfo);

        // }

        break;
      default:
    }
  };
  // const handleUpdateTree = (nodes: NodeType[]) => {};
  const handleUpdateTree = (
    nodes: NodeType[],
    sourceKey: any,
    destinationKey: any
  ) => {
    // تابع بازگشتی برای جستجو در ارایه تو در تو
    function findAndMove(nodes: any[], sourceKey: any, destinationKey: any) {
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i];

        if (item.key === sourceKey) {
          // حذف ابجکت با sourceKey از آرایه
          nodes.splice(i, 1);

          // جستجو برای ابجکت با destinationKey
          const destinationItem = findItemByKey(treeData, destinationKey);

          if (destinationItem) {
            // اضافه کردن ابجکت به زیر ابجکت با destinationKey
            destinationItem.children.push(item);
          } else {
            console.log("شیء مورد نظر پیدا نشد");
          }

          break;
        } else if (item.children && item.children.length > 0) {
          // فراخوانی تابع به صورت بازگشتی برای جستجو در زیر آرایه‌ها
          findAndMove(item.children, sourceKey, destinationKey);
        }
      }
    }

    // تابع برای جستجو در آرایه بر اساس key
    function findItemByKey(array: string | any[], key: any) {
      for (let i = 0; i <= array.length; i++) {
        const item = array[i];

        if (item.key === key) {
          return item;
        } else if (item.children) {
          return findItemByKey(item.children, key);
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

  const handlePaste = () => {
    setTreeData();
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        updateTreeData: handleUpdateTree,
      }}
    >
      <div className="App">
        <Sidebar>
          <ExtendedTree
            setSelectedNodeKey={setSelectedNodeId}
            setSelectedInfo={setSelectedInfo}
            handleContextMenuClick={handleContextMenuClick}
            selectedInfo={selectedInfo}
            // setSelectedNodeKey={setSelectedNodeKey}
          />
          <button onClick={handlePaste}>click</button>
        </Sidebar>
        {showEdit && <Form item={selectedInfo} updateNode={handleUpdateNode} />}
      </div>
    </AppContext.Provider>
  );
}
export default App;
