import React from "react";
import styled from "styled-components";
import Layout from "components/Layout";
import SEO from "components/SEO";
import Title from "components/Title";
import Divider from "components/Divider";
import { description, siteUrl, title } from "../../blog-config";
import VerticalSpace from "../components/VerticalSpace";

const Resume = styled.div`
  margin-top: 100px;
  line-height: 1.92;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  color: ${(props) => props.theme.colors.text};
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SmallTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  color: ${(props) => props.theme.colors.text};
  word-break: break-all;
  a {
    color: ${(props) => props.theme.colors.text};
  }
`;

const Description = styled.p`
  width: 40%;
  color: ${(props) => props.theme.colors.text};
  word-break: keep-all;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const ResumePage = () => (
  <Layout>
    <SEO title={title} description={description} url={siteUrl} />
    <Resume>
      <div>
        <Title size="md">이예서&nbsp;&nbsp;Yeseo Lee</Title>
        <Description>
          누군가의 용기가 될 그날을 위해 끊임없이 발전을 추구합니다. 커리어
          목표는 UI/UX 전문성을 갖춘 Web Front-end 엔지니어가 되는 것입니다.
          독서, 사진 촬영, 그리고 저를 효율적으로 만드는 모든 활동을 좋아합니다.
        </Description>
      </div>
      <Divider mt="80px" mb="80px" />
      <div>
        <div />
        <Description>
          <SmallTitle>
            <a href="https://omnuum.io/" target="_blank">
              OMNUUM
            </a>{" "}
            (2022.01-)
          </SmallTitle>
          코딩 없이 여러 개의 NFT PFP 프로젝트 컬렉션을 제작하는 툴인 Generative
          Art Builder Web Front-end 개발을 진행하였습니다. 현재 클린 아키텍쳐
          도입을 위한 리팩토링 작업을 진행 중입니다.
        </Description>
      </div>
      <VerticalSpace size="60" />
      <div>
        <div />
        <Description>
          <SmallTitle>
            <a href="https://marpple.shop/kr" target="_blank">
              MARPPLE
            </a>{" "}
            (2021.10-)
          </SmallTitle>
          마플코퍼레이션에서 Web Front-end 엔지니어로 근무 중입니다.
        </Description>
      </div>
      <VerticalSpace size="60" />
      <div>
        <div />
        <Description>
          <SmallTitle>
            <a href="https://www.e-mirim.hs.kr/" target="_blank">
              미림여자정보과학고등학교
            </a>{" "}
            (2019.03-2022.01)
          </SmallTitle>
          IT 마이스터고등학교에서 뉴미디어 웹솔루션과를 졸업하였습니다.
        </Description>
      </div>
    </Resume>
  </Layout>
);

export default ResumePage;
