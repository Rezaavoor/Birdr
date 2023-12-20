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
              [...props.myBirds].map(displayBirdsCB)
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
            font-size: 1.2rem;
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
            margin: 5px;
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
