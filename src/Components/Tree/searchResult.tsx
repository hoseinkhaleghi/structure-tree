import React from 'react';
import { NodeType } from '../../types';
import ArrowUpIcon from '../SvgIcons/arrow-up';
// import styles from "./searchResult.module.css"

interface Props {
	items: (NodeType & { hierarchy: string[] })[],
	setSearchResultVisible : (key: boolean) => void,
	searchResultVisible:boolean,
	setSelectedInfo:any
}

function SearchResult({ items,searchResultVisible , setSearchResultVisible,setSelectedInfo }: Props) {
	return <div className='search-result' style={{height: 200, overflow: 'auto'}}>
		{searchResultVisible && <div style={{inset:"0px"  , display:'flex' , justifyContent:'center', alignItems:'center', justifyItems:'center'}} onClick={(e)=>{setSearchResultVisible(!e)}} ><ArrowUpIcon /></div>}
		{items.map(item => (
			<div onClick={setSelectedInfo(item)} key={item.key}>
				{item.title}
			</div>
		))
		}
	</div>
}
export default SearchResult;