import React, { useState } from 'react';
import { Drawer } from 'antd';

import 'antd/dist/antd.css';

interface FolioDrawerProps{
    visible: boolean;
    onClose: any;
}

const FolioDrawer = (props:FolioDrawerProps) =>{
    const [isEditable, setIsEditable] = useState<boolean>()

    return(
        <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
        >
            <h1>Hej dö world</h1>
        </Drawer>
    );
}

export default FolioDrawer