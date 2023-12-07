import React from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Icon, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function SearchForm(props) {
    const theme = useTheme();
    const [value, setValue] = useState('')

    function textChangeACB(event){
        console.log(event.target.value);
        setValue(event.target.value);
        props.changeTextValue(event.target.value);
    }

    function clickSearchHandlerACB(){
        console.log("You tried to search");
        props.searchClick();
    }

  return (<div>
            <div
                className={css`
                display: flex;
                text-align: center;
                align-items: center;
                position: relative;
                justify-content: center;
                margin-top: 10vh;
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
                    value={value}
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
  </div>);
}
