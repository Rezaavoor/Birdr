import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { InfoIcon, AddIcon } from "@chakra-ui/icons";

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
        <>
          <div
            className={css`
              padding: 20px;
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
          <div>
            <Image
              src={bird.images[0]}
              alt={bird.name}
              objectFit="cover"
              boxSize={500}
              fallbackSrc="https://via.placeholder.com/150"
            />
          </div>
        </>
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
