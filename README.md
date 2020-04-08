# @specialblend/apollo-blackbox

> React Apollo Providers with loading, error and data states

[![NPM](https://img.shields.io/npm/v/@specialblend/apollo-blackbox.svg)](https://www.npmjs.com/package/@specialblend/apollo-blackbox) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @specialblend/apollo-blackbox
```

## Usage

```jsx
import React from 'react'
import MyComponent from './MyComponent'
import typeDefs from './typeDefs'

import { ApolloBlackbox } from '@specialblend/apollo-blackbox'

// simulates query is loading forever
function LoadingExample () {
    return (
        <ApolloBlackbox loading>
            <MyComponent />
        </ApolloBlackbox>
    )
}

// simulates query returned an error
function ErrorExample () {

    const error = new Error('oops. something bad happened.')

    return (
        <ApolloBlackbox error={error}>
            <MyComponent />
        </ApolloBlackbox>
    )
}

// simulates mock API from typeDefs
function DataExample () {
    return (
        <ApolloBlackbox typeDefs={typeDefs}>
            <MyComponent />
        </ApolloBlackbox>
    )
}

```

## License

MIT © [specialblend](https://github.com/specialblend)
