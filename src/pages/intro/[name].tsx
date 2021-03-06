import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Intro } from "../../model/Intro";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

type Props = {
  name: string;
  intro: Intro;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as { name: string };
  console.log("building for ::: ", name);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("==================");
  let client = createClient({
    space: process.env.CF_SPACE_ID!,
    accessToken: process.env.CF_CD_ACCESS_TOKEN!,
  });
  let entries = await client.getEntries<Intro>({ content_type: "intro" });
  let intro = entries.items.find((entry) => entry.fields.id === name)?.fields!;
  return { props: { name, intro }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: "ashay" } }],
    fallback: "blocking",
  };
};

const IntroContainer = styled.div``;

const IntroTitle = styled.h2``;

const LinkContainer = styled.div`
  background-color: cornflowerblue;
  padding-left: 20px;
  line-height: 30px;
`;

const IntroPage = (props: Props) => {
  return (
    <IntroContainer>
      <Head>
        <title>{props.name}</title>
      </Head>
      <LinkContainer>
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </LinkContainer>
      <IntroTitle>{props.intro.title}</IntroTitle>
      {documentToReactComponents(props.intro.description, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
            return (
              <Image
                alt={node.data.target.fields.file.description}
                src={`https://${node.data.target.fields.file.url}`}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
              />
            );
          },
        },
      })}
    </IntroContainer>
  );
};

export default IntroPage;
