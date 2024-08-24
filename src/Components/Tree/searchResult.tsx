import { Button, Popover, Tree } from "antd";
import { NodeType } from "../../types";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import OrgchartIcon from "../SvgIcons/orgchart";
import { useContext, useState } from "react";
import AppContext from "../../appContext";

interface Props {
  items: (NodeType & { hierarchy: string[] })[];
  setSearchResultVisible: (key: boolean) => void;
  searchResultVisible: boolean;
  setSelectedInfo: any;
  selectedInfo: any;
  setExpandedKeys: any;
}

function SearchResult({
  items,
  searchResultVisible,
  setSearchResultVisible,
  setSelectedInfo,
  setExpandedKeys,
}: Props) {
  const { treeData } = useContext(AppContext);
  const [orgChartOpen, setOrgChartOpen] = useState(false);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [ancestors, setAncestors] = useState<NodeType[]>([]);

  // Function to find ancestors
  const findAncestors = (nodes: NodeType[], key: string): NodeType[] => {
    let result: NodeType[] = [];
    function search(nodes: NodeType[], targetKey: string) {
      for (const node of nodes) {
        if (node.key === targetKey) {
          result.push(node);
          return true;
        }
        if (node.children) {
          if (search(node.children, targetKey)) {
            result.unshift(node); // Add parent nodes before the target node
            return true;
          }
        }
      }
      return false;
    }
    search(nodes, key);
    return result;
  };
  const handleItemClick = (item: NodeType) => {
    setSelectedInfo(item);
    // console.log(item);
    setExpandedKeys(item.hierarchy);
    // selectedSearchResult.selected === true
    // setSelectedSearchResult((prevState: any) => ({
    // 	...prevState,
    // 	selected: true,
    //   }))
  };

  const handleItemClickChart = (item: NodeType) => {
    setSelectedInfo(item);
    setSelectedNodeKey(item.key);
    const newAncestors = findAncestors(treeData, item.key); // Get ancestors for the selected node
    setAncestors(newAncestors);
    setExpandedKeys(newAncestors.map((n) => n.key));
    setOrgChartOpen(true); // Open the org chart popover on selection
    console.log(newAncestors);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOrgChartOpen(newOpen);
  };

  return (
    <div className="search-result" style={{ height: 200, overflow: "auto" }}>
      {searchResultVisible && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => setSearchResultVisible(false)}
        >
          <ArrowUpIcon />
        </div>
      )}
      {items.map((item) => (
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          key={item.key}
        >
          <div
            style={{ marginTop: 20, cursor: "pointer" }}
            onClick={() => handleItemClick(item)}
          >
            {item.title}
          </div>
          <div
            style={{ marginTop: 20, cursor: "pointer", width: 20, height: 20 }}
          >
            <Popover
              content={
                <Tree
                  treeData={ancestors.length > 0 ? ancestors : []} // Ensure we pass the correct data
                  selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
                />
              }
              trigger="click"
              open={orgChartOpen}
              onOpenChange={handleOpenChange}
            >
              <div onClick={() => handleItemClickChart(item)}>
                <OrgchartIcon />
              </div>
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;
