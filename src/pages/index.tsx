import styled from "styled-components";
import { GetStaticProps } from "next";
import { Intro } from "../model/Intro";
import { createClient } from "contentful";
import Link from "next/link";
import Head from "next/head";

const HPContainer = styled.div``;

type Props = {
  intros: Intro[];
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  let client = createClient({
    space: process.env.CF_SPACE_ID!,
    accessToken: process.env.CF_CD_ACCESS_TOKEN!,
  });
  let entries = await client.getEntries<Intro>({ content_type: "intro" });
  let intros = entries.items.map((i) => i.fields);
  return {
    props: {
      intros: intros,
    },
  };
};

const HomePage = (props: Props) => {
  return (
    <HPContainer>
      <Head>
        <title>Intro to my family</title>
        <meta
          name="description"
          content="This is an introduction to my family"
        />
      </Head>
      <h1>People</h1>
      <ul>
        {props.intros?.map((i) => (
          <li key={i.id}>
            <Link href={"/intro/" + i.id}>
              <a>{i.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </HPContainer>
  );
};

export default HomePage;
