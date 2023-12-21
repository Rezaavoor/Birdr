import { Button, Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";

export default function Search(props) {
  const theme = useTheme();

  console.log(" searchView suggestedbird\n" + props.suggestedResults);

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
                    margin: 15px;
                    ${theme.breakpoints.medium} {
                      flex-direction: column;
                    }
                  `}
                >
                  <p
                    className={css`
                      margin-right: 10px;
                    `}
                  >
                    {"Pages:"}
                  </p>
                  <div
                    className={css`
                      display: flex;
                      flex-wrap: wrap;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    {Array.from(Array(props.totalPages).keys()).map(
                      displayPageButtonsCB
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={css`
                  margin-bottom: 50px;
                `}
              >
                <p>No birds was found :(</p>
                <div
                  className={css`
                    margin-bottom: 50px;
                  `}
                >
                  <p>Popular Picks:</p>
                  <div
                    className={css`
                      width: 100%;
                      max-width: 100%;
                      display: grid;
                      grid-template-columns: repeat(
                        auto-fill,
                        minmax(15%, 1fr)
                      );
                      gap: 100px 100px;
                      justify-content: center;
                      align-items: center;
                      flex-grow: 1;
                      margin: 10px auto;
                    `}
                  >
                    {props.status === "data" ? (
                      props.suggestedResults ? (
                        [...props.suggestedResults].map(displayBirdsCB)
                      ) : (
                        <h1></h1>
                      )
                    ) : props.status === "loading" ? (
                      <Spinner size="xl" />
                    ) : props.status === "error" ? (
                      <h1>"Error"</h1>
                    ) : (
                      <h1></h1>
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <p></p>
          )}

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
            position: relative;
            top: -50px;
            background-color: rgba(0, 0, 0, 0.5);
            width: ${bird.images[0] ? "200px" : "198px"};
            ${theme.breakpoints.small} {
              width: ${bird.images[0] ? "150px" : "148px"};
              top: -40px;
            }
            text-align: center;
            font-size: ${bird.name.length > 15 ? "0.9rem" : "1.2rem"};
            cursor: pointer;
          `}
        >
          {bird.name}
        </div>
      </div>
    );
  }
}
