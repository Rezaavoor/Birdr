import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { AddIcon } from "@chakra-ui/icons";
import AudioPlayer from "react-h5-audio-player";

export default function Bird({ bird, status, onClickAddToMyBirds }) {
  const theme = useTheme();
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {status == "data" ? (
        <div
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          `}
        >
          <div
            className={css`
              padding: 20px;
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
                `}
              >
                {bird.name}
              </h1>
              <div
                onClick={onClickAddToMyBirds}
                className={css`
                  align-items: center;
                  cursor: pointer;
                  transition: all 0.2s ease-in-out;
                  :hover {
                    transform: scale(1.4);
                  }
                  margin-left: 40px;
                `}
              >
                <AddIcon boxSize={6} color={theme.colors.white} />
              </div>
            </div>
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
          <div>
            {bird.images.length ? (
              <Image
                src={bird.images[0]}
                alt={bird.name}
                objectFit="cover"
                boxSize={500}
                borderRadius={"20%"}
                fallbackSrc="/Placeholder.svg"
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
        <h1>"No Data"</h1>
      )}
    </div>
  );
}
