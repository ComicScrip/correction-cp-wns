import { gql, useQuery } from "@apollo/client";
import { loadavg } from "os";
import { useParams } from "react-router-dom";

const GET_COUNTRY_DETAILS = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      currency
    }
  }
`;

export default function CountryDetails() {
  const { code } = useParams();

  const { data, loading } = useQuery<{
    country: { name: string; emoji: string; capital: string; currency: string };
  }>(GET_COUNTRY_DETAILS, { variables: { code } });

  if (loading || typeof data === "undefined") return <div>loading...</div>;

  const { name, emoji, capital, currency } = data.country;

  return (
    <div>
      <h1>{name}</h1>
      <p>{emoji}</p>
      <ul>
        <li>capital: {capital}</li>
        <li>currency: {currency}</li>
      </ul>
    </div>
  );
}
