import * as React from 'react'
import { PresetAIChatbot, ChatbotProps } from '../src';

export default {
  title: 'Chatbot',
  component: PresetAIChatbot,
  argTypes: {
    // children: {
    //   control: {
    //     type: 'text',
    //   },
    // },
  },
  // parameters: {
  //   controls: { expanded: true },
  // },
};

export const Chatbot = (args: ChatbotProps) => <PresetAIChatbot {...args} />;

// const Template: Story<Props> = args => <Button {...args} />;

// // By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// // https://storybook.js.org/docs/react/workflows/unit-testing
// export const Default = Template.bind({});

// Default.args = {};
