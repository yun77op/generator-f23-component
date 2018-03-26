import React from 'react';
import { storiesOf } from '@storybook/react';
import <%= Class %> from './src/<%= name %>.js';

storiesOf("<%= name %>", module)
  .add('default', () => (<button>click</button>))