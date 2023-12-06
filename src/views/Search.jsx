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
            top: 10vh;
            width: 100%;
            text-align: left;
            box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 1);
            font-size: 2rem;
            color: ${theme.colors.light};
            user-select: none;
          `}
        >
          <p>Search Result:</p>
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

        </div>
      </div>
    </div>
  );

  function displayBirdsCB(bird){
    function clickHandlerACB(){
      props.onClickHandler(bird);
      window.location.hash = "#/details"
    }
    return(
      <span key={bird.id} onClick={clickHandlerACB} class="result-item">
        <img src={bird.image} height = "100"></img>
        <div>{bird.name}</div>
      </span>
    )
  }
}
