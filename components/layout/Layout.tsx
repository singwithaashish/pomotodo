import { Box, Grommet } from "grommet";

export default function Layout({ children }: { children: React.ReactNode }) {
    const mtheme = {
        global: {
          colors: {
            brand: "#ea580c",
          },
          font: {
            family: "Roboto",
            size: "18px",
            height: "20px",
          },
        },
        button: {
          border: {
            radius: "5px",
          },
          extend: {
            transition: "transform 0.2s ease-in-out",  // Apply the transition to the transform property
            ":hover": {
              transform: "scale(1.1)",  // Increase the size of the button by 10% on hover
            },
          },
          primary: {
            color: "#ea580c",
            background: "#ea580c",
          },
        },
        clock: {
          analog: {
            minute: {
              size: "1000px",
            },
          },
        },
      };

      
      return (
        
          <Grommet theme={mtheme}>
            {children}
          </Grommet>
        
      );
}