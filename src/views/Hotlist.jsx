import React from "react";
import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

export default function Hotlist(props) {
  const theme = useTheme();
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <div
        className={css`
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          ${theme.breakpoints.medium} {
            margin-top: 10vh;
          }
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
            Hot List, The top viewed birds on the website:
          </p>
          <div
            className={css`
              width: 100%;
              max-width: 100%;
              display: grid;
              grid-template-columns: repeat(4, minmax(15%, 1fr));
              gap: 100px 100px;
              ${theme.breakpoints.large} {
                grid-template-columns: repeat(3, minmax(15%, 1fr));
              }
              ${theme.breakpoints.medium} {
                grid-template-columns: repeat(2, minmax(15%, 1fr));
              }
              ${theme.breakpoints.small} {
                grid-template-columns: repeat(2, minmax(15%, 1fr));
                gap: 50px 50px;
              }
              justify-content: center;
              align-items: center;
            `}
          >
            {props.status == "data" ? (
              [...props.currentHotlist].map(displayBirdsCB)
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

  function displayBirdsCB(bird, index) {
    function clickHandlerACB() {
      props.onClickHandler(bird);
    }
    const birdPosition = index + 1;
    return (
      <div
        key={bird.id}
        onClick={clickHandlerACB}
        className={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease-in-out;
          :hover {
            transform: scale(1.1);
          }
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 200px;
            width: 200px;
            ${theme.breakpoints.small} {
              height: 150px;
              width: 150px;
            }
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
            borderRadius={10}
          />
        </div>
        <div
          className={css`
            font-size: 1.2rem;
            cursor: pointer;
            margin-top: 5px;
            white-space: nowrap;
          `}
        >{`${birdPosition}. ${bird.name}`}</div>
      </div>
    );
  }
}
