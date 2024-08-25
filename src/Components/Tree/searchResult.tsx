import { Popover, Tree } from "antd";
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
  items = [],
  searchResultVisible = false,
  setSearchResultVisible = () => {},
  setSelectedInfo = () => {},
  setExpandedKeys = () => {},
}: Props) {
  const { treeData } = useContext(AppContext);
  const [orgChartOpen, setOrgChartOpen] = useState<string | null>(null);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [ancestors, setAncestors] = useState<NodeType[]>([]);

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
            result.unshift(node);
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
    setExpandedKeys(item.hierarchy);
  };

  const handleItemClickChart = (item: NodeType) => {
    setSelectedInfo(item);
    setSelectedNodeKey(item.key);
    const newAncestors = findAncestors(treeData, item.key);
    setAncestors(generateUniqueKeys(newAncestors)); // استفاده از کلیدهای یکتا برای نودهای والد
    setOrgChartOpen(item.key);
  };

  const handleOpenChange = (key: string | null) => {
    if (orgChartOpen === key) {
      setOrgChartOpen(null);
    } else {
      setOrgChartOpen(key);
    }
  };

  // تابع برای تولید کلیدهای یکتا
  const generateUniqueKeys = (data: any) => {
    const seenKeys = new Set();
    return data.map((item: { key: any; children?: NodeType[] }) => {
      let uniqueKey = item.key;
      let counter = 1;

      while (seenKeys.has(uniqueKey)) {
        uniqueKey = `${item.key}-${counter}`;
        counter++;
      }

      seenKeys.add(uniqueKey);

      // تولید کلیدهای یکتا برای فرزندان
      const childrenWithUniqueKeys = item.children
        ? generateUniqueKeys(item.children)
        : undefined;

      return { ...item, key: uniqueKey, children: childrenWithUniqueKeys };
    });
  };

  // استفاده از داده‌های یکتا
  const uniqueItems = generateUniqueKeys(items);

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
      {uniqueItems.map((item: NodeType) => (
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
                  treeData={ancestors}
                  selectedKeys={selectedNodeKey ? [selectedNodeKey] : []}
                />
              }
              trigger="click"
              open={orgChartOpen === item.key}
              onOpenChange={() => handleOpenChange(item.key)}
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
