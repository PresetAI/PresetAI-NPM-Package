import * as React from 'react'
import { PresetAISearchBar, SearchProps } from '../src';
import '../src/index.css';

export default {
  title: 'Search',
  component: PresetAISearchBar,
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

export const Searchs = (args: SearchProps) => <PresetAISearchBar {...args} />;

// const Template: Story<Props> = args => <Button {...args} />;

// // By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// // https://storybook.js.org/docs/react/workflows/unit-testing
// export const Default = Template.bind({});

// Default.args = {};
