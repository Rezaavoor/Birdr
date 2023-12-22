import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Image,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function MyBirds(props) {
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
          {props.status === "data" ? (
            props.myBirds.length === 0 ? (
              <div style={{ userSelect: 'text', position: 'absolute',
               top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                 textAlign: 'center',
                  marginTop: '50px' }}>
                <p>Your birdwatching journey begins here! Click <Button colorScheme='green' size='xl' variant='link' onClick={props.searchClickHandler}>here </Button>
                <span style={{ marginLeft: '8px' }}>to search and add your first bird 😉</span></p></div>
            ) : (
              [...props.myBirds].map(displayBirdsCB)
            )
          ) : props.status === "loading" ? (
            <Spinner size="xl" />
          ) : props.status === "error" ? (
            <h1>Error</h1>
          ) : (
            <h1></h1>
          )}
          </div>
        </div>
      </div>
    </div>
  );

  function displayBirdsCB(bird) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    function clickHandlerACB() {
      props.onClickHandler(bird);
    }
    function removeMyBird() {
      onClose();
      props.removeBird(bird);
    }
    function DeleteButton() {
      return (
        <>
          <div onClick={onOpen}>
            <Tooltip label="Remove this bird" fontSize="md">
              <div>
                <DeleteIcon boxSize={7} color={theme.colors.white} />
              </div>
            </Tooltip>
          </div>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay color={"black"}>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Remove Bird
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to remove this LOVELY bird? :(
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={removeMyBird} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      );
    }
    return (
      <div
        key={bird.id}
        className={css`
          position: relative;
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
          onClick={clickHandlerACB}
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
          onClick={clickHandlerACB}
          className={css`
            position: absolute;
            bottom: 30px;
            background-color: rgba(0, 0, 0, 0.5);
            width: ${bird.images[0] ? "200px" : "198px"};
            ${theme.breakpoints.small} {
              width: ${bird.images[0] ? "150px" : "148px"};
              bottom: 10px;
            }
            text-align: center;
            font-size: ${bird.name.length > 15 ? "0.9rem" : "1.2rem"};
            cursor: pointer;
          `}
        >
          {bird.name}
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            :hover {
              transform: scale(1.1);
              color: black;
            }
          `}
        >
          <DeleteButton />
        </div>
      </div>
    );
  }
}