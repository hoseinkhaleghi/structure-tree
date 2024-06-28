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

import { useEffect, useContext, useState, useMemo } from "react";
import AppContext from "./appContext";
import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./transportLayer";
import { deleteEmptyChildren  } from "./Components/Util/utils";
import { NodeType } from "./types";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEdit, setShowEdit] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState([]);
  const [clipBoard, setClipBoard] = useState([]);
  const [paste,setPaste] = useState([])


  ///////////////////////////////////////////////////////
  const [selectedInfo, setSelectedInfo] = useState([]);




  ///////////////////////////////////////////////////////

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

  useEffect(()=>{
   handleUpdateTree(treeData)

  },[paste])
  // const handleCut = ()=>{setClipBoard(cutEmptyChildren)}

  const handleContextMenuClick = (actionKey: any) => () => {
    switch (actionKey) {
      case "Add":
        console.log("Add");
        break;
      case "Delete":
        console.log(selectedNodeIdString)
        setTreeData((prevResult) => {
          return deleteEmptyChildren(prevResult, selectedNodeIdString);
        });
        break;
      case "Paste":
        selectedInfo.node.children = clipBoard
        setPaste(selectedInfo.node)

        // handleUpdateNode(selectedNodeKey, selectedNodeIdString);


        break;
      case "Cut":
        // setClipBoard(cutEmptyChildren)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        // (()=>{handleCut})
        if (selectedInfo.node.children.length === 0) {
        
          setClipBoard(selectedInfo.node)
          }
    


        break;
      default:
        console.log("not");
    }
  };
  // const handleUpdateTree = (nodes: NodeType[]) => {};
  const handleUpdateTree = (nodes: NodeType[]) => {
    
    // nodes.map((parentNode : any,index : any)=>{
    //   if(parentNode.key === paste.key){
    //     parentNode = paste
    //     return parentNode
    //   }
    //   else{
    //     parentNode.children.map((children : any , childenIndex : any){
    //       if(children.key === paste.key){
    //         children = paste
    //         return children
    //       }
    //     })
    //   }
    // })

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
      <div className="App">
        <Sidebar>
          <ExtendedTree
            setSelectedNodeKey={setSelectedNodeId}
            setSelectedInfo={setSelectedInfo}
            handleContextMenuClick={handleContextMenuClick}
            selectedInfo={selectedInfo}
            // setSelectedNodeKey={setSelectedNodeKey}
          />
        </Sidebar>
        {showEdit && <Form item={selectedInfo} updateNode={handleUpdateNode}  />}
      </div>
    </AppContext.Provider>
  );
}
export default App;
