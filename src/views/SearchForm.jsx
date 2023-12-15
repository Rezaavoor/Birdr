import React from "react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Input, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function SearchForm(props) {
  const theme = useTheme();
  const [value, setValue] = useState("");

  function textChangeACB(event) {
    setValue(event.target.value);
    props.changeTextValue(event.target.value);
  }

  function clickSearchHandlerACB() {
    props.searchClick();
  }

  function handleKeyDown(event){
    if(event.key === "Enter"){
      props.searchClick();
    }
  }

  function hasImageACB(){
    props.onlyImages();
  }

  return (
    <div>
      <div
        className={css`
          display: flex;
          text-align: center;
          align-items: center;
          position: relative;
          justify-content: center;
          margin-top: 15vh;
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
            onKeyDown={handleKeyDown}
          />
        </div>
        <div
          className={css`
            position: relative;
            left: -30px;
            z-index: 2;
          `}
        >
          <SearchIcon
            boxSize={6}
            color={theme.colors.dark}
            onClick={clickSearchHandlerACB}
          />
        </div>
        <div>
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='img-only' mb='0'>
            Only want search results with images?
          </FormLabel>
          <Switch id='img-only' onChange={hasImageACB} defaultChecked={props.hasImg}/>
        </FormControl>
        </div>
      </div>
    </div>
  );
}
