import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'

const { Panel } = Collapse

function RadioBox(props) {
    const [Value, setValue] = useState(0)

    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <Radio key={value._id} value={`${value._id}`}> {value.name} </Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActivekey={['0']}>
                {/* // 켜졌을때 박스 닫혀있는거 = 0 */}
                <Panel header="Price" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
