import React from "react";
import { Link } from "react-router-dom";
import { gql, graphql } from "react-apollo";

const ContinentList = ({ data: { loading, error, continents } }) => {
  if (loading) {
    return <p>Loading asdfasdf...{loading}</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      {continents.map(c => (
        <div key={c.code} className="channel">
          <Link to={`continent/${c.code}`}>{c.name}</Link>
        </div>
      ))}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    continents {
      code
      name
      countries {
        code
        name
      }
    }
  }
`;

export default graphql(channelsListQuery)(ContinentList);
