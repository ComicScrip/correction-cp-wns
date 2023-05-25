import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Country, { CountryInput } from "../entity/Country";
import db from "../db";

@Resolver(Country)
class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return db.getRepository(Country).find();
  }

  @Query(() => Country)
  async country(@Arg("code") code: string): Promise<Country> {
    const country = await db
      .getRepository(Country)
      .findOne({ where: { code } });
    if (country === null) throw new Error("country not found");
    return country;
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
    return await db.getRepository(Country).save(data);
  }
}

export default CountryResolver;
