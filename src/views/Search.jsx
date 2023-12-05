import { Image } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { InfoIcon, AddIcon } from "@chakra-ui/icons";

export default function Home(props) {
  const theme = useTheme();
  return (
    <div
      className={css`
        position: relative;
        background-color: ${theme.colors.dark};
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 50vh;
          background-image: linear-gradient(
            ${theme.colors.dark},
            rgba(0, 0, 0, 0)
          );
          z-index: 2;
        `}
      />
      <div
        className={css`
          position: relative;
          z-index: 3;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 30vh;
            width: 100%;
            text-align: center;
            box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 1);
            font-size: 2rem;
            color: ${theme.colors.light};
            user-select: none;
          `}
        >
          <p>Search Result</p>
        </div>
        <div
          className={css`
            position: absolute;
            top: 70vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: 50px;
            `}
          >
            <AddIcon boxSize={7} color={theme.colors.white} />
            Add To My Birds
          </div>
          <div
            className={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: 50px;
            `}
          >
            <InfoIcon boxSize={7} color={theme.colors.white} />
            More Details
          </div>
        </div>
      </div>
    </div>
  );
}
