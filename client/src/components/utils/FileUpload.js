import React from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'

function FileUpload() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* 리액트 dropzone 라이브러리 활용 (공식 문서의 사용법 활용) */}
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}> 
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300, height: 240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }}></Icon> 
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}

export default FileUpload
