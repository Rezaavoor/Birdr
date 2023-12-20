import { Button, Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

export default function Search(props) {
  const theme = useTheme();
  function displayPageButtonsCB(buttonNumberIndex) {
    const page = buttonNumberIndex + 1;
    function onPageClickACB() {
      props.onPageClick(page);
    }
    return (
      <Button
        key={page}
        variant={props.currentPage == page ? "solid" : "outline"}
        color={props.currentPage == page ? "black" : "white"}
        _hover={{
          color: "black",
          backgroundColor: "white",
        }}
        onClick={onPageClickACB}
      >
        {page}
      </Button>
    );
  }
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
          font-size: 1.2rem;
          ${theme.breakpoints.medium} {
            font-size: 0.8rem;
          }
          ${theme.breakpoints.large} {
            font-size: 0.9rem;
          }
        `}
      >
        <div
          className={css`
            position: absolute;
            width: 100%;
            text-align: left;
            color: ${theme.colors.light};
            user-select: none;
            padding: 1%;
          `}
        >
          {props.status == "data" ? (
            props.totalResults != 0 ? (
              <div
                className={css`
                  margin-bottom: 50px;
                `}
              >
                <p>{`Found ${props.totalResults} birds:`}</p>
                <div
                  className={css`
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <p
                    className={css`
                      margin-right: 10px;
                    `}
                  >
                    {"Pages:"}
                  </p>
                  {Array.from(Array(props.totalPages).keys()).map(
                    displayPageButtonsCB
                  )}
                </div>
              </div>
            ) : (
              <p>No birds was found :(</p>
            )
          ) : (
            <p></p>
          )}

          <div
            className={css`
              width: 100%;
              max-width: 100%;
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
              gap: 100px 100px;
              justify-content: center;
              align-items: center;
              flex-grow: 1;
              margin: 10px auto;
            `}
          >
            {props.status == "data" ? (
              [...props.searchResults].map(displayBirdsCB)
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
    function birdClickHandlerACB() {
      props.onBirdClick(bird);
    }
    return (
      <div
        key={bird.id}
        onClick={birdClickHandlerACB}
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
          className={css`
            font-size: 1.2rem;
            cursor: pointer;
          `}
        >
          {bird.name}
        </div>
      </div>
    );
  }
}
