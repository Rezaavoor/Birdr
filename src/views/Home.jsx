import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { InfoIcon, Icon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Home({
  name,
  images,
  status,
  onClickHandleMyBirds,
  onClickMoreDetails,
  isBirdLiked,
  isLoggedIn,
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
          ${theme.breakpoints.medium} {
            top: 0;
          }
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
          ${theme.breakpoints.medium} {
            top: 0;
          }
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 1;
        `}
        id="image-div"
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
            onClick={onClickMoreDetails}
            className={css`
              position: relative;
              width: 50%;
              text-align: center;
              font-size: 2.5rem;
              color: ${theme.colors.white};
              font-weight: bold;
              background-color: rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(10px);
              cursor: pointer;
              ${theme.breakpoints.medium} {
                font-size: 2rem;
                width: 90%;
              }
              ${theme.breakpoints.small} {
                top: 25vh;
              }
              border-radius: 20px;
              transition: all 0.5s ease-in-out;
              * {
                transition: all 0.5s ease-in-out;
              }
              :hover {
                transform: translateY(15px);
                background-color: rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
                * {
                  transform: scale(1.1);
                }
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
              top: 70vh;
            }
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div className={css`
          `}>
            {isLoggedIn ? (
              isBirdLiked ? (
                <div
                  onClick={onClickHandleMyBirds}
                  className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 200px;
                    height: 70px;
                    margin: 50px;
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    ${theme.breakpoints.small} {
                      width: 110px; 
                      height: 50px; 
                    }
                    transition: all 0.2s ease-in-out;
                    :hover {
                      transform: scale(1.1);
                      background-color: rgba(0, 0, 0, 0.1);
                    }
                  `}
                >
                  <Icon as={FaHeart} boxSize={7} color={theme.colors.white} />
                  <p>Remove This Bird</p>
                </div>
              ) : (
                <div
                  onClick={onClickHandleMyBirds}
                  className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 200px;
                    height: 70px;
                    margin: 50px;
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    ${theme.breakpoints.small} {
                      width: 110px; 
                      height: 50px; 
                    }
                    transition: all 0.2s ease-in-out;
                    :hover {
                      transform: scale(1.1);
                      background-color: rgba(0, 0, 0, 0.1);
                    }
                  `}
                >
                  <Icon
                    as={FaRegHeart}
                    boxSize={7}
                    color={theme.colors.white}
                  />
                  <p>Add To My Birds</p>
                </div>
              )
            ) : (
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: ${theme.colors.light};
                  width: 200px;
                  height: 70px;
                  margin: 50px;
                  select: none;
                  background-color: rgba(0, 0, 0, 0.2);
                  backdrop-filter: blur(10px);
                  border-radius: 20px;
                  ${theme.breakpoints.small} {
                    width: 110px; 
                    height: 50px; 
                  }
                `}
              >
                <Icon as={FaRegHeart} boxSize={7} color={theme.colors.light} />
                <p>Add To My Birds</p>
              </div>
            )}
          </div>
          <div className={css``}>
            <div
              onClick={onClickMoreDetails}
              className={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 70px;
                margin: 50px;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                ${theme.breakpoints.small} {
                  width: 110px; 
                  height: 50px; 
                }
                transition: all 0.2s ease-in-out;
                :hover {
                  transform: scale(1.1);
                  background-color: rgba(0, 0, 0, 0.1);
                }
              `}
            >
              <InfoIcon boxSize={7} color={theme.colors.white} />
              More Details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
