import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { getAccessList } from '../../transportLayer';

interface Props {
	initialValue?: any;
}

function Accesses({ }: Props) {
	const [options, setOptions] = useState([]);

	const fetchAccessList = async () => {
		const result = await getAccessList();
		setOptions(result);
	}

	useEffect(() => {
		fetchAccessList()
	}, [])


	function handleOnChange() {

	}

	return (
		<Checkbox.Group options={options as any} onChange={handleOnChange} />
	);
}
export default Accesses