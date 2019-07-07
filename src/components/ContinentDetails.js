import React from "react";
import CountryList from "./CountryList";
import NotFound from "./NotFound";

import { gql, graphql } from "react-apollo";

const ContinentDetails = ({ data: { loading, error, continent }, match }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (continent === null) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="channelName">{continent.name}</div>
      <CountryList countries={continent.countries} />
    </div>
  );
};

export const continentDetailsQuery = gql`
  query ContinentDetailsQuery($code: String!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;

export default graphql(continentDetailsQuery, {
  options: props => ({
    variables: { code: props.match.params.continent }
  })
})(ContinentDetails);
