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
        background-color: ${theme.colors.dark};
      `}
    >
      <div
        className={css`
          position: absolute;
          overflow: hidden;
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
            box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 1);
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
            Hot List, The top viewed birds on the website.
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
      <span key={bird.id} onClick={clickHandlerACB} className="result-item">
          <div className={css`
              height: 200px;
              width: 200px;
              overflow: hidden;
          `}>
              <Image
              src={bird.images[0]}
              alt={bird.name}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </div>
        <div className={css`
            font-size: 1.2rem;
        `}>{`${birdPosition}. ${bird.name}`}</div>
      </span>
    );
  }
}
