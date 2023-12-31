import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Icon } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export default function Navbar({
  children,
  onButtonClick,
  logOutHandler,
  logInHandler,
  user,
}) {
  const theme = useTheme();
  const currentRoute = useLocation().pathname;
  const onHomeClickACB = () => {
    onButtonClick("/");
  };
  const onSearchClickACB = () => {
    onButtonClick("/search");
  };
  const onHotlistClickACB = () => {
    onButtonClick("/hotlist");
  };
  const onMybirdsClickACB = () => {
    onButtonClick("/mybirds");
  };
  const onAuthClickACB = () => {
    //onButtonClick("/auth");
  };

  const onLogInClickACB = () => {
    logInHandler();
  };

  const onLogOutClick = () => {
    logOutHandler();
  };
  return (
    <div>
      <div
        className={css`
          border-bottom: 1px solid
            ${currentRoute != "/" ? theme.colors.light : "rgba(0, 0, 0, 0)"};
          background-color: ${currentRoute != "/" && theme.colors.dark};
          width: 100vw;
          margin: auto;
          padding: 10px 50px;
          display: flex;
          position: fixed;
          justify-content: space-between;
          top: 0;
          z-index: 99;
          * {
            transition: all 0.2s ease-in-out;
          }
        `}
      >
        <div
          onClick={onHomeClickACB}
          className={css`
            user-select: none;
            cursor: pointer;
            :hover {
              transform: scale(1.2);
            }
          `}
        >
          <Icon viewBox="0 0 256 256" color="red.500" boxSize={9}>
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <rect fill="none" height="256" width="256" />
              <circle cx="164" cy="68" r="8" fill="#fff" />
              <line
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
                x1="120"
                x2="80"
                y1="136"
                y2="184"
              />
              <path
                d="M208,96v24a96,96,0,0,1-96,96H8L104,96V76A52,52,0,0,1,206.3,62.9L232,80Z"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="8"
              />
            </svg>
          </Icon>
          <p>Birdr</p>
        </div>
        <div
          className={css`
            display: flex;
            width: 50%;
            justify-content: space-between;
            div {
              :hover {
                transform: scale(1.1);
              }
            }
            ${theme.breakpoints.medium} {
              width: 100%;
            }
          `}
        >
          <div
            className={css`
              align-items: center;
              margin: auto;
            `}
          >
            <p
              className={css`
                cursor: pointer;
                user-select: none;
                border-bottom: 1px solid
                  ${currentRoute == "/"
                    ? theme.colors.light
                    : "rgba(0, 0, 0, 0)"};
                :hover {
                  border-bottom: 1px solid ${theme.colors.light};
                }
              `}
              onClick={onHomeClickACB}
            >
              Home
            </p>
          </div>
          <div
            className={css`
              align-items: center;
              margin: auto;
            `}
          >
            <p
              className={css`
                cursor: pointer;
                user-select: none;
                border-bottom: 1px solid
                  ${currentRoute == "/search"
                    ? theme.colors.light
                    : "rgba(0, 0, 0, 0)"};
                :hover {
                  border-bottom: 1px solid ${theme.colors.light};
                }
              `}
              onClick={onSearchClickACB}
            >
              Search
            </p>
          </div>
          <div
            className={css`
              align-items: center;
              margin: auto;
            `}
          >
            <p
              className={css`
                cursor: pointer;
                user-select: none;
                border-bottom: 1px solid
                  ${currentRoute == "/hotlist"
                    ? theme.colors.light
                    : "rgba(0, 0, 0, 0)"};
                :hover {
                  border-bottom: 1px solid ${theme.colors.light};
                }
              `}
              onClick={onHotlistClickACB}
            >
              Hot List
            </p>
          </div>
          <div
            className={css`
              align-items: center;
              margin: auto;
            `}
          >
            {user ? (
              <p
                className={css`
                  cursor: pointer;
                  user-select: none;
                  border-bottom: 1px solid
                    ${currentRoute == "/mybirds"
                      ? theme.colors.light
                      : "rgba(0, 0, 0, 0)"};
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={onMybirdsClickACB}
              >
                My Birds
              </p>
            ) : (
              <div></div>
            )}
          </div>
          <div
            className={css`
              align-items: center;
              margin: auto;
            `}
          >
            {" "}
            {user ? (
              // User is logged in, show logout button
              <p
                className={css`
                  cursor: pointer;
                  user-select: none;
                  border-bottom: 1px solid
                    ${currentRoute == "/auth"
                      ? theme.colors.light
                      : "rgba(0, 0, 0, 0)"};
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={onLogOutClick}
              >
                Logout
              </p>
            ) : (
              // User is not logged in, show login button
              <p
                className={css`
                  cursor: pointer;
                  user-select: none;
                  border-bottom: 1px solid
                    ${currentRoute == "/auth"
                      ? theme.colors.light
                      : "rgba(0, 0, 0, 0)"};
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={onLogInClickACB}
              >
                Login
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={css`
          padding-top: 80px;
          ${theme.breakpoints.medium} {
            padding-top: 0px;
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}
