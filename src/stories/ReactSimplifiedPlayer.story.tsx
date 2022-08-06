import React from "react";
import { Meta, Story } from "@storybook/react";
import { ReactSimplifiedPlayer } from "..";
import { PlayerProps } from "../typings/player.types";

const Button = () => <button>hello</button>

export default {
  title: "Component / Player",
  component: Button,
  args: {},
} as Meta<PlayerProps>;

export const Primary: Story<PlayerProps> = (args) => (
  <Button />
);