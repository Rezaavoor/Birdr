import React from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Icon, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchForm(props) {
    const theme = useTheme();
    function textChangeACB(event){
        props.textChange(event.target.value);
    }

    function clickSearchHandlerACB(){
        props.searchClick();
    }

  return <div>SearchForm
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
                    value={props.text || ""}
                    onChange={textChangeACB}
                />
                </div>
                <div
                className={css`
                    position: relative;
                    left: -30px;
                    z-index: 2;
                `}
                >
                <SearchIcon boxSize={6} color={theme.colors.dark} onClick={clickSearchHandlerACB}/>
                </div>
            </div>
  </div>;
}
