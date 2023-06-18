import { Box, Button, Nav, ResponsiveContext } from "grommet";
import { Clock, List, Dashboard, SettingsOption } from "grommet-icons";
import Link from "next/link";

function MyNavBar() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <ResponsiveContext.Consumer>
      {(size) =>
        size === "small" && (
          <Box
            direction="row"
            pad="small"
            gap="medium"
            justify="evenly"
            align="center"
            style={{
              position: "sticky",
              bottom: "0px",
              background: "white",
              width: "100vw",
            }}
          >
            <Link href="/" passHref>
              <Button
                icon={<Clock color={currentPath === "/" ? "brand" : "gray"} />}
                hoverIndicator
              />
            </Link>
            <Link href="/tasks" passHref>
              <Button
                icon={
                  <List color={currentPath === "/tasks" ? "brand" : "gray"} />
                }
                hoverIndicator
              />
            </Link>
            <Link href="/dashboard" passHref>
              <Button
                icon={
                  <Dashboard
                    color={currentPath === "/dashboard" ? "brand" : "gray"}
                  />
                }
                hoverIndicator
              />
            </Link>
            <Link href="/settings" passHref>
              <Button
                icon={
                  <SettingsOption
                    color={currentPath === "/settings" ? "brand" : "gray"}
                  />
                }
                hoverIndicator
              />
            </Link>
          </Box>
        )
      }
    </ResponsiveContext.Consumer>
  );
}

export default MyNavBar;
