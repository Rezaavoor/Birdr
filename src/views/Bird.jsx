import { Image, Spinner } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { InfoIcon, AddIcon } from "@chakra-ui/icons";

export default function Bird({ bird, onClickAddToMyBirds, status }) {
  return (
    <div>
      {status == "data" ? (
        <h1>{bird.name}</h1>
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
