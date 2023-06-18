import { Box, Button, Nav } from "grommet";
import { Clock, List, Dashboard, SettingsOption } from "grommet-icons";
import Link from "next/link";

function MyNavBar() {
  return (
    <Box direction="row" pad="small" gap="medium" justify="evenly" align="center" style={{
        position: "sticky",
        bottom: "0px",
        background: "white",
        width: "100vw"
    }}>
      <Link href="/" passHref>
        <Button icon={<Clock />} hoverIndicator />
      </Link>
      <Link href="/tasks" passHref>
        <Button icon={<List />} hoverIndicator />
      </Link>
      <Link href="/dashboard" passHref>
        <Button icon={<Dashboard />} hoverIndicator />
      </Link>
      <Link href="/settings" passHref>
        <Button icon={<SettingsOption />} hoverIndicator />
      </Link>
    </Box>
  );
}

export default MyNavBar;
