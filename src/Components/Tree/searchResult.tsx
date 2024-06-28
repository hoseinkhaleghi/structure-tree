import React from 'react';
import { NodeType } from '../../types';
import ArrowUpIcon from '../SvgIcons/arrow-up';
interface Props {
  items: (NodeType & { hierarchy: string[] })[],
  setSearchResultVisible : (key: boolean) => void,
  searchResultVisible:boolean,
  setSelectedSearchResult: (item: NodeType | null) => void,
}
function SearchResult({ items,searchResultVisible , setSearchResultVisible, setSelectedSearchResult }: Props) {
  const handleItemClick = (item: NodeType) => {
    setSelectedSearchResult(item);
	console.log(item,"klkl")

	// item.title="an "
};


return (
  <div className='search-result' style={{height: 200, overflow: 'auto'}}>
	{searchResultVisible && (
	  <div
		style={{
		  inset: "0px",
		  display: 'flex',
		  justifyContent: 'center',
		  alignItems: 'center',
		  justifyItems: 'center'
		}}
		onClick={() => setSearchResultVisible(false)}
	  >
		<ArrowUpIcon />
	  </div>
	)}
	{items.map(item => (
	  <div style={{marginTop:10}} key={item.key} onClick={() => handleItemClick(item)}>
		{item.title}
	  </div>
	))}
  </div>
);
}
export default SearchResult;
