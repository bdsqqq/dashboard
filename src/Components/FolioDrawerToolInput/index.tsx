import React from "react";
import styled from "styled-components";

import Input from "../FolioDrawerInput";

const ToolInput = styled(Input)``;

const FolioDrawerToolInput = React.forwardRef((props: any, ref: any) => {
  return <ToolInput ref={ref} {...props} />;
});

export default FolioDrawerToolInput;
