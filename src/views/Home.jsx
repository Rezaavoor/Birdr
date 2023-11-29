import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

export default function Home() {
  const theme = useTheme();
  return (
    <div
      className={css`
        background-color: ${theme.colors.dark};
      `}
    >
      Home
    </div>
  );
}
