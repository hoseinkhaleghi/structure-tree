import { Input, Tree } from "antd";
import React, { useContext, useState } from "react";
import AppContext from "../../appContext";
import { NodeType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";
const { Search } = Input;
interface Props {
  handleContextMenuClick: (key: string) => void;
  setSelectedInfo: any;
  setShowEdit: any;
  setSelectedNodeKey: any;
  selectedInfo: any;
  setSelectedSearchResult: any;
  selectedSearchResult: any;
  setNewNodeInfo: any;
  isAddingNewNode:any;
  setIsAddingNewNode:any;
}
const TreeExtended = ({
  setSelectedNodeKey,
  handleContextMenuClick,
  setSelectedInfo,
  setShowEdit,
  selectedInfo,
  setSelectedSearchResult,
  setNewNodeInfo,
  isAddingNewNode,
  setIsAddingNewNode,
}: Props) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchResultVisible, setSearchResultVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]) as any;
  const [searchInput, setSearchInput] = useState([]) as any;

  const { treeData } = useContext(AppContext);
  const onExpand = (expandedKeysValue: any[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(true);
  };

  const searchNodeByTitle = (node: any, targetTitle: any) => {
    if (node.title.includes(targetTitle)) {
      setSearchResult((res: any) => [...res, node]);
    }

    for (const child of node.children) {
      const result = searchNodeByTitle(child, targetTitle);
      if (result) {
        setSearchResult((res: any) => [...res, result]);
      }
    }
    return null;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handlePressEnter = () => {
    setSearchResult([]);
    searchNodeByTitle(treeData[0], searchInput);
    setSearchResultVisible(true);
  };
  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  };
  // const handleNodeSelect = (node: any, info: any) => {
  //   if (!isAddingNewNode) { 
  //     setSelectedSearchResult(info);
  //     setSelectedNodeKey(node);
  //     setSelectedInfo(info.node);
  //     setShowEdit(true);
  //     setNewNodeInfo(null);
  //   }
  //   setIsAddingNewNode(false);
  // };
  const handleNodeSelect = (node: any, info: any) => {
    if (isAddingNewNode) {
        setIsAddingNewNode(false); // برای پایان دادن به فرآیند اضافه کردن نود جدید
    } else {
        setSelectedSearchResult(info);
        setSelectedNodeKey(node);
        setSelectedInfo(info.node);
        setShowEdit(true);
        // setNewNodeInfo(null); // پاک کردن newNodeInfo بعد از انتخاب نود
    }
};

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 20 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
        onSearch={handlePressEnter}
      />

      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={handleNodeSelect}
        selectedKeys={selectedInfo.key}
      />
      {searchResultVisible && (
        <SearchResult
          searchResultVisible={searchResultVisible}
          setSearchResultVisible={setSearchResultVisible}
          items={searchResult}
          setSelectedInfo={setSelectedInfo}
          selectedInfo={selectedInfo}
          setExpandedKeys={setExpandedKeys}
        />
      )}
    </div>
  );
};
export default TreeExtended;
