import { Button, Header, Menu } from "grommet";
import { FC } from "react";

function MyHeader() {
  return (
    <Header background="brand" >
      <Button hoverIndicator >
        <strong>Tomato</strong>
      </Button>
      <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
  );
}

export default MyHeader;
