import React from "react";
import AkDropdownMenu from "@atlaskit/dropdown-menu";
import { AkGlobalItem } from "@atlaskit/navigation";
import HelpIcon from "@atlaskit/icon/glyph/question-circle";

export default (
  <AkDropdownMenu
    appearance={"tall"}
    items={[
      {
        heading: "About",
        items: [{ content: "How it works" }]
      }
    ]}
    position={"right bottom"}
  >
    <AkGlobalItem>
      <HelpIcon label={"About"} />
    </AkGlobalItem>
  </AkDropdownMenu>
);
