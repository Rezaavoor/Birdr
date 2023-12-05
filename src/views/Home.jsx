import { Image, Spinner } from "@chakra-ui/react";
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
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 1;
        `}
      >
        {props.status == "data" &&
        props.model.birdOfTheDayPromiseState.data.images[0] ? (
          <Image
            src={props.model.birdOfTheDayPromiseState.data.images[0]}
            alt={props.model.birdOfTheDayPromiseState.data.name}
            fallbackSrc="https://placehold.co/800"
          />
        ) : (
          <div />
        )}
      </div>
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
          <p>{props.status == "data" ? "Bird Of The Day" : ""}</p>
        </div>
        <div
          className={css`
            position: absolute;
            top: 45vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            className={css`
              width: 50%;
              text-align: center;
              font-size: 2.5rem;
              color: ${theme.colors.white};
              user-select: none;
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.3);
            `}
          >
            {props.status == "data" ? (
              <h1>{props.model.birdOfTheDayPromiseState.data.name}</h1>
            ) : props.status == "loading" ? (
              <Spinner size="xl" />
            ) : props.status == "error" ? (
              <h1>"Error"</h1>
            ) : (
              <h1>"No Data"</h1>
            )}
          </div>
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
