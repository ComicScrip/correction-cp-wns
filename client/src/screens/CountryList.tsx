import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const GET_COUNTRIES_FOR_CONTINENT = gql`
  query getContinent($code: ID!) {
    continent(code: $code) {
      name
      countries {
        code
        name
        emoji
      }
    }
  }
`;

export default function CountryList() {
  const [search, setSearch] = useState("");
  const { code } = useParams();
  const { data, loading } = useQuery<{
    continent: {
      name: string;
      countries: { code: string; name: string; emoji: string }[];
    };
  }>(GET_COUNTRIES_FOR_CONTINENT, { variables: { code } });

  if (loading || typeof data === "undefined") return <div>loading...</div>;

  return (
    <div>
      <h1>Countries for {data.continent.name}</h1>
      <input
        placeholder="search for a country"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.continent.countries
          .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
          .map((c) => {
            return (
              <div
                key={c.code}
                style={{
                  border: "1px solid lightgrey",
                  width: 150,
                  height: 150,
                }}
              >
                <p>{c.emoji}</p>
                <Link to={`/countries/${c.code}`}>{c.name}</Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
