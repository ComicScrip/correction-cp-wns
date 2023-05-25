import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      code
      name
    }
  }
`;

export default function ContinentList() {
  const [search, setSearch] = useState("");
  const { data, loading } = useQuery<{
    continents: { code: string; name: string }[];
  }>(GET_CONTINENTS, { variables: { search } });

  if (loading || typeof data === "undefined") return <div>loading...</div>;

  return (
    <div>
      <input
        placeholder="search for a continent"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {data.continents
        .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
        .map((c) => {
          return (
            <div key={c.code}>
              <Link to={`/continents/${c.code}`}>{c.name}</Link>
            </div>
          );
        })}
    </div>
  );
}
