import { Image, Spinner, Tooltip } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Icon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AudioPlayer from "react-h5-audio-player";

export default function Bird({
  bird,
  status,
  onClickHandleMyBirds,
  isBirdLiked,
  isLoggedIn,
}) {
  const theme = useTheme();
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px; /* Add margin to create space from the top */
      `}
    >
      {status == "data" ? (
        <div
          className={css`
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 15px;
            ${theme.breakpoints.medium} {
              flex-direction: column;
            }
          `}
        >
          <div
            className={css`
              margin: 20px;
              position: relative;
            `}
          >
            <div
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
              `}
            >
              <h1
                className={css`
                  font-size: 2rem;
                  font-weight: 700;
                  text-align: center;
                  ${theme.breakpoints.medium} {
                    font-size: 1.5rem;
                  }
                `}
              >
                {bird.name}
              </h1>
              {isLoggedIn ? (
                isBirdLiked ? (
                  <div
                    onClick={onClickHandleMyBirds}
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
                    <Tooltip label="Remove this bird" fontSize="md">
                      <div>
                        <Icon
                          as={FaHeart}
                          boxSize={7}
                          color={theme.colors.white}
                        />
                      </div>
                    </Tooltip>
                  </div>
                ) : (
                  <div
                    onClick={onClickHandleMyBirds}
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
                    <Tooltip label="Add this bird" fontSize="md">
                      <div>
                        <Icon
                          as={FaRegHeart}
                          boxSize={7}
                          color={theme.colors.white}
                        />
                      </div>
                    </Tooltip>
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
                    margin: 50px;
                    select: none;
                  `}
                >
                  <Tooltip label="Add this bird" fontSize="md">
                    <div>
                      <Icon
                        as={FaRegHeart}
                        boxSize={7}
                        color={theme.colors.white}
                      />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
            <div
              className={css`
                font-size: 1rem;
                background-color: ${theme.colors.gray};
                border-radius: 10px;
                padding: 15px;
              `}
            >
              <p>Family: {bird.family}</p>
              {bird.lengthMin && bird.lengthMax && (
                <p>
                  Size: {bird.lengthMin}-{bird.lengthMax} cm
                </p>
              )}
              {bird.wingspanMin && bird.wingspanMax && (
                <p>
                  Wing Span: {bird.wingspanMin}-{bird.wingspanMax} cm
                </p>
              )}

              {bird.sciName && <p>Scientific Name: {bird.sciName}</p>}
              {bird.region && <p>Region: {bird.region[0]}</p>}
              {bird.status && <p>Status: {bird.status}</p>}
              {bird.order && <p>Order: {bird.order}</p>}
            </div>
          </div>
          <div
            className={css`
              max-width: 40%;
              ${theme.breakpoints.medium} {
                max-width: 80%;
              }
            `}
          >
            {bird.images.length ? (
              <Image
                src={bird.images[0]}
                alt={bird.name}
                objectFit="cover"
                borderRadius={"20%"}
                fallbackSrc="/Placeholder.svg"
                boxSize="100%"
                className={css`
                  width: 500px;
                  height: 500px;
                  ${theme.breakpoints.medium} {
                    width: 200px;
                    height: 200px;
                  }
                `}
              />
            ) : (
              <Image
                src={"/no-image.svg"}
                alt={"No Image"}
                objectFit="cover"
                boxSize={500}
              />
            )}

            {bird.recordings.length ? (
              <div className={css``}>
                <AudioPlayer src={bird.recordings[0].file} volume={0.5} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : status == "loading" ? (
        <Spinner size="xl" />
      ) : status == "error" ? (
        <h1>"Error"</h1>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}
