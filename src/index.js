import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ApolloLink, Observable } from 'apollo-link';
import SchemaLink from 'apollo-link-schema';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import PropTypes from 'prop-types';
import React from 'react';

const DEFAULT_ERROR = {
    message: 'Generic Apollo Blackbox Error',
};

const DEFAULT_CACHE = new InMemoryCache();

const PropTypeError = PropTypes.shape({
    message: PropTypes.string.isRequired,
});

const createLoadingLink = () => new ApolloLink(() => new Observable(() => {}));

const createErrorLink = ({
    error,
    errors = [error || DEFAULT_ERROR],
}) =>
    new ApolloLink(() => new Observable(o => {
        o.next({ errors });
        o.complete();
    }));

const createDataLink = ({ typeDefs }) => {
    const schema = makeExecutableSchema({ typeDefs });
    addMockFunctionsToSchema({ schema });
    return new SchemaLink({ schema });
};

const createLoadingClient = ({
    cache = DEFAULT_CACHE,
    link = createLoadingLink(),
}) => new ApolloClient({ cache, link });

const createErrorClient = ({
    error,
    cache = DEFAULT_CACHE,
    link = createErrorLink({ error }),
}) =>
    new ApolloClient({ cache, link });

const createDataClient = ({
    typeDefs,
    cache = DEFAULT_CACHE,
    link = createDataLink({ typeDefs }),
}) =>
    new ApolloClient({ cache, link });

export function ApolloBlackboxLoading({ children }) {
    return (
        <ApolloProvider client={createLoadingClient({})}>
            {children}
        </ApolloProvider>
    );
}

ApolloBlackboxLoading.propTypes = {
    children: PropTypes.node.isRequired,
};

export function ApolloBlackboxError({ error, children }) {
    return (
        <ApolloProvider client={createErrorClient({ error })}>
            {children}
        </ApolloProvider>
    );
}

ApolloBlackboxError.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypeError,
};

ApolloBlackboxError.defaultValues = {
    error: DEFAULT_ERROR,
};

export function ApolloBlackboxData({ typeDefs, children }) {
    return (
        <ApolloProvider client={createDataClient({ typeDefs })}>
            {children}
        </ApolloProvider>
    );
}

ApolloBlackboxData.propTypes = {
    children: PropTypes.node.isRequired,
};

export function ApolloBlackbox({ typeDefs, loading, error, children }) {
    if (loading) {
        return (
            <ApolloBlackboxLoading>
                {children}
            </ApolloBlackboxLoading>
        );
    }
    if (error) {
        return (
            <ApolloBlackboxError error={error}>
                {children}
            </ApolloBlackboxError>
        );
    }

    return (
        <ApolloBlackboxData typeDefs={typeDefs}>
            {children}
        </ApolloBlackboxData>
    );
}

ApolloBlackbox.propTypes = {
    typeDefs: PropTypes.any,
    loading: PropTypes.bool,
    error: PropTypeError,
    children: PropTypes.node.isRequired,
};
