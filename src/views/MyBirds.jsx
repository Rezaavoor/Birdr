import React from "react";
import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function MyBirds(props) {
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
          position: relative;
          ${theme.breakpoints.medium} {
            margin-top: 10vh;
          }
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <div
          className={css`
            position: absolute;
            width: 100%;
            text-align: left;
            font-size: 1.5rem;
            ${theme.breakpoints.medium} {
              font-size: 0.8rem;
            }
            ${theme.breakpoints.large} {
              font-size: 0.9rem;
            }
            color: ${theme.colors.light};
            user-select: none;
            padding: 1%;
          `}
        >
          <p
            className={css`
              margin: 50px 0;
            `}
          >
            My Birds:
          </p>
          <div
            className={css`
              width: 90%;
              max-width: 100%;
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
              gap: 100px 100px;
              padding 16px;
              justify-content: center;
              align-items: center;
              flex-grow: 1;
              margin: 0 auto;
              ${theme.breakpoints.medium} {
                gap: 50px 50px;
              }
            `}
          >
            {props.status == "data" ? (
              [...props.myBirds].map(displayBirdsCB)
            ) : props.status == "loading" ? (
              <Spinner size="xl" />
            ) : props.status == "error" ? (
              <h1>"Error"</h1>
            ) : (
              <h1></h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function displayBirdsCB(bird) {
    function clickHandlerACB() {
      props.onClickHandler(bird);
    }
    function removeMyBird() {
      props.removeBird(bird);
    }
    return (
      <span key={bird.id} className="result-item">
        <div
          onClick={clickHandlerACB}
          className={css`
            height: 200px;
            width: 200px;
            overflow: hidden;
            cursor: pointer;
          `}
        >
          <Image
            src={bird.images[0]}
            alt={bird.name}
            fallbackSrc="/Placeholder.svg"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </div>
        <div
          onClick={clickHandlerACB}
          className={css`
            font-size: 1.2rem;
            cursor: pointer;
          `}
        >
          {bird.name}
        </div>
        <div
          onClick={removeMyBird}
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 50px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            :hover {
              transform: scale(1.1);
            }
          `}
        >
          <DeleteIcon boxSize={7} color={theme.colors.white} />
        </div>
      </span>
    );
  }
}
