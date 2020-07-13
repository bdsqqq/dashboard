import React from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Popconfirm } from "antd";

import usePureSplice from "../../hooks/usePureSplice";

import iconStyles from "../../IconStyles";

import ToolsWrapper from "../FolioDrawerToolsWrapper";

import Tool from "../FolioDrawerTool";

import ToolHeader from "../FolioDrawerToolHeader";
import ToolLabel from "../FolioDrawerToolLabel";
import ToolRemoveButton from "../FolioDrawerToolRemoveButton";
import ToolAddWrapper from "../FolioDrawerToolAddWrapper";
import ToolInput from "../FolioDrawerToolInput";

const FolioDrawerFormTools = (props: any) => {
  const { tools, setTools } = props;

  const pureSplice = usePureSplice();

  return (
    <ToolsWrapper>
      {tools.map((val: any, index: number) => (
        <Tool key={index}>
          <ToolHeader>
            <ToolLabel>Tool {(index as number) + 1}</ToolLabel>
            <ToolRemoveButton>
              <Popconfirm
                icon={null}
                placement="left"
                title="Deletar essa ferramenta？"
                okText="Sim"
                cancelText="Não"
                onConfirm={() => {
                  const updatedTools = pureSplice(tools, index, 1);
                  setTools(updatedTools);
                }}
              >
                <FiTrash2 style={iconStyles as React.CSSProperties} />
              </Popconfirm>
            </ToolRemoveButton>
          </ToolHeader>
          <ToolInput
            id={`inputTool-${index}`}
            data-idx={index}
            type="text"
            value={val}
            onChange={(e: any) => {
              const updatedTools = [...tools];
              updatedTools[e.target.dataset.idx] = e.target.value;
              setTools(updatedTools);
            }}
          />
        </Tool>
      ))}
      <ToolAddWrapper>
        <FiPlus
          style={iconStyles as React.CSSProperties}
          onClick={() => setTools([...tools, ""])}
        />
      </ToolAddWrapper>
    </ToolsWrapper>
  );
};

export default FolioDrawerFormTools;
