import React from 'react';
import { NodeType } from '../../types';
import {ContextMenuTriggerEx, ContextMenuItemEx, ContextMenuEx } from '../ContextMenu';

interface Props {
	node: NodeType;
	handleContextMenuClick: (key: string) => void;
}

function Node({node, handleContextMenuClick}:Props) {
	return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
			<ContextMenuTriggerEx
        id={node.key}
        title={node.title}
       />
      <ContextMenuEx  id={node.key} >
        <ContextMenuItemEx  handleClick={handleContextMenuClick('Add')} title={'افزودن زیرشاخه'}/>
        <ContextMenuItemEx handleClick={handleContextMenuClick('Cut')} title={'برش'}/>
        <ContextMenuItemEx handleClick={handleContextMenuClick('Paste')} title={'چسباندن'}/>
        <ContextMenuItemEx handleClick={handleContextMenuClick('Delete')} title={'حذف'}/>
      </ContextMenuEx>
    </div>
  );
}
export default Node