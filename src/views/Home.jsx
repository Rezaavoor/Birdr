import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { InfoIcon, AddIcon } from "@chakra-ui/icons";

export default function Home({
  name,
  images,
  status,
  onClickAddToMyBirds,
  onClickMoreDetails,
  signInhandler,
  signOuthandler
}) {
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
          top: -10vh;
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
          top: -10vh;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 1;
        `}
      >
        {status == "data" && images[0] ? (
          <Image
            src={images[0]}
            alt={name}
            objectFit="cover"
            width="100%"
            height="100%"
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
            top: 20vh;
            width: 100%;
            text-align: center;
            box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -webkit-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 0.5);
            -moz-box-shadow: 0px 32px 61px 12px rgba(0, 0, 0, 1);
            font-size: 2rem;
            color: ${theme.colors.light};
            user-select: none;
            ${theme.breakpoints.medium} {
              font-size: 1.5rem;
            }
          `}
        >
          <p>{status == "data" ? "Bird Of The Day" : ""}</p>
        </div>
        <div
          className={css`
            position: absolute;
            top: 35vh;
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
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.3);
              ${theme.breakpoints.medium} {
                font-size: 2rem;
                width: 90%;
              }
            `}
          >
            {status == "data" ? (
              <h1>{name}</h1>
            ) : status == "loading" ? (
              <Spinner size="xl" />
            ) : status == "error" ? (
              <h1>"Error"</h1>
            ) : (
              <h1>"No Data"</h1>
            )}
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            top: 65vh;
            ${theme.breakpoints.medium} {
              top: 50vh;
            }
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div
            onClick={onClickAddToMyBirds}
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
            <AddIcon boxSize={7} color={theme.colors.white} />
            Add To My Birds
          </div>
          <div
            onClick={onClickMoreDetails}
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
            <InfoIcon boxSize={7} color={theme.colors.white} />
            More Details
          </div>
          <button onClick={signInhandler}>Log In</button>

          <span>
          <button onClick={signOuthandler}>Log out</button>
          </span>
          
        </div>
        
      </div>
    </div>
  );
}
