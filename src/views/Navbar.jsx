import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Icon, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Navbar({ children }, props) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState(""); // State for searchQuery and setting it

  function handleSearchACB(){
    console.log("Search Query:", searchQuery);
    props.searchClick();
  };
  return (
    <div>
      <div
        className={css`
          border-bottom: 1px solid ${theme.colors.gray};
          width: 100vw;
          margin: auto;
          padding: 10px 50px;
          display: flex;
          position: fixed;
          justify-content: space-between;
          top: 0;
          z-index: 99;
        `}
      >
        <div
          className={css`
            user-select: none;
            cursor: pointer;
          `}
        >
          <Icon viewBox="0 0 256 256" color="red.500" boxSize={10}>
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
            width: 100%;
            padding-left: 40px;
            justify-content: space-between;
          `}
        >
          <div
            className={css`
              display: flex;
              text-align: center;
              align-items: center;
              position: relative;
              justify-content: space-between;
            `}
          >
            <div
              className={css`
                z-index: 1;
              `}
            >
              <Input
                placeholder="Looking for a bird?..."
                size="sm"
                backgroundColor={theme.colors.white}
                color={theme.colors.dark}
                paddingInlineEnd={10}
                value={searchQuery}
                onChange={(inputChange) => setSearchQuery(inputChange.target.value)}
              />
            </div>
            <div
              className={css`
                position: relative;
                left: -30px;
                z-index: 2;
              `}
            >
              {handleSearchACB()}
              <SearchIcon boxSize={6} color={theme.colors.dark} />
            </div>
          </div>
          <div
            className={css`
              display: flex;
              width: 50%;
              justify-content: space-around;
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
                  border-bottom: 1px solid rgba(0, 0, 0, 0);
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={() => (window.location.href = "/")}
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
                  border-bottom: 1px solid rgba(0, 0, 0, 0);
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={() => (window.location.href = "search")}
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
                  border-bottom: 1px solid rgba(0, 0, 0, 0);
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={() => (window.location.href = "hotlist")}
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
              <p
                className={css`
                  cursor: pointer;
                  user-select: none;
                  border-bottom: 1px solid rgba(0, 0, 0, 0);
                  :hover {
                    border-bottom: 1px solid ${theme.colors.light};
                  }
                `}
                onClick={() => (window.location.href = "mybirds")}
              >
                My Birds
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={css``}>{children}</div>
    </div>
  );
}
