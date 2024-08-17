import { NodeType } from "../../types";
import ArrowUpIcon from "../SvgIcons/arrow-up";
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

  return (
    <div className="search-result" style={{ height: 200, overflow: "auto" }}>
      {searchResultVisible && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => setSearchResultVisible(false)}
        >
          <ArrowUpIcon />
        </div>
      )}
      {items.map((item) => (
        <div
          style={{ marginTop: 20, cursor: "pointer" }}
          key={item.key}
          onClick={() => handleItemClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
export default SearchResult;
