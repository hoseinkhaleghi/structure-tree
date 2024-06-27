import { Input, Tree } from "antd";
// import type { DataNode } from 'antd/es/tree';
import React, { useContext, useMemo, useRef, useState } from "react";
import AppContext from "../../appContext";
import { NodeType } from "../../types";
import Node from "./node";
import SearchResult from "./searchResult";
// import Item from "antd/lib/list/Item";
const { Search } = Input;
interface Props {
  handleContextMenuClick: (key: string) => void;
  onCut: (key: string) => void;
  onSelect: (key: string[]) => void;
}
const TreeExtended = ({ onSelect, handleContextMenuClick, onCut }: Props) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const searchedKeyword = useRef();
  const [searchResultVisible, setSearchResultVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  // const [selectedNodeKey, setSelectedNodeKey] = useState(null);

  const { treeData } = useContext(AppContext);
  // const onExpand = (newExpandedKeys: any[]) => {
  //   setExpandedKeys(newExpandedKeys);
  //   setAutoExpandParent(false);
  // };
  const onExpand = (expandedKeysValue: any[]) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.target.value)
    setSearchResult(
      treeData.filter((item) => {
        return (
          item.title.includes(searchInput) ||
          item.users.includes(searchInput) 
        );
      })
    );
  };
console.log(searchInput)
console.log(treeData)

  const handlePressEnter = () => {
    setSearchResultVisible(true);
  };
  const titleRenderer = (node: NodeType) => {
    return <Node node={node} handleContextMenuClick={handleContextMenuClick} />;
  };
  const handleNodeSelect = (node: any,info:any) => {
    onSelect(node);
    if (info.node.children.length === 0) {
      onCut(info);
    }
    // console.log(info.node.children)
  };

  const onCheck = (checkedKeysValue: any) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  return (
    <div className="tree-wrap">
      <Search
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
        onPressEnter={handlePressEnter}
        onSearch={handlePressEnter}
      />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
        onSelect={handleNodeSelect}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
      />
      {searchResultVisible && <SearchResult searchResultVisible={searchResultVisible} setSearchResultVisible={setSearchResultVisible} items={searchResult} />}
    </div>
  );
};
export default TreeExtended;
