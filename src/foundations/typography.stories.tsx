import React from "react";
import styled from "styled-components";

import { Table, Tbody, Td, Th, Thead, Tr } from "../components/Table";
import {
  Category,
  Header,
  Main,
  Subtitle,
  Title,
} from "../storybook-components";

import foundations from ".";

export default {
  title: "Foundations/Typography",
};

const H1Text = styled.span`
  ${foundations.typography.H1};
`;

const H2Text = styled.span`
  ${foundations.typography.H2};
`;

const H3Text = styled.span`
  ${foundations.typography.H3};
`;

const H4Text = styled.span`
  ${foundations.typography.H4};
`;

const Subtitle1Text = styled.span`
  ${foundations.typography.Subtitle1};
`;

const Subtitle2Text = styled.span`
  ${foundations.typography.Subtitle2};
`;

const Body1200Text = styled.span`
  ${foundations.typography.Body1_200};
`;

const Body1300Text = styled.span`
  ${foundations.typography.Body1_300};
`;

const Body1400Text = styled.span`
  ${foundations.typography.Body1_400};
`;

const Body2200Text = styled.span`
  ${foundations.typography.Body2_200};
`;

const Body2300Text = styled.span`
  ${foundations.typography.Body2_300};
`;

const Body2400Text = styled.span`
  ${foundations.typography.Body2_400};
`;

const Body3200Text = styled.span`
  ${foundations.typography.Body3_200};
`;

const Body3300Text = styled.span`
  ${foundations.typography.Body3_300};
`;

const Body3400Text = styled.span`
  ${foundations.typography.Body3_400};
`;

const Caption200Text = styled.span`
  ${foundations.typography.Caption_200};
`;

const Caption300Text = styled.span`
  ${foundations.typography.Caption_300};
`;

const SubCaptionText = styled.span`
  ${foundations.typography.SubCaption};
`;

export const TextStyles = () => (
  <>
    <Header>
      <Category>Foundations</Category>
      <Title>Typography</Title>
      <Subtitle>Text styles</Subtitle>
    </Header>
    <Main>
      <Table>
        <Thead>
          <tr>
            <Th width="180px">Type kind</Th>
            <Th>Sample</Th>
            <Th width="180px">Size</Th>
            <Th width="180px">Weight</Th>
            <Th width="180px">Line Height</Th>
            <Th width="180px">Letter Spacing</Th>
          </tr>
        </Thead>
        <Tbody>
          <Tr>
            <Th width="180px">
              <H1Text>H1</H1Text>
            </Th>
            <Td>
              <H1Text>다람쥐 헌 쳇바퀴에 타고파</H1Text>
            </Td>
            <Td width="180px">48px (3rem)</Td>
            <Td width="180px">100 Light (300)</Td>
            <Td width="180px">60px (1.25)</Td>
            <Td width="180px">-1.25px (-0.0781rem)</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <H2Text>H2</H2Text>
            </Th>
            <Td>
              <H2Text>다람쥐 헌 쳇바퀴에 타고파</H2Text>
            </Td>
            <Td width="180px">32px (2rem)</Td>
            <Td width="180px">200 Regular (400)</Td>
            <Td width="180px">42px (1.3125)</Td>
            <Td width="180px">-0.5px (-0.03125rem)</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <H3Text>H3</H3Text>
            </Th>
            <Td>
              <H3Text>다람쥐 헌 쳇바퀴에 타고파</H3Text>
            </Td>
            <Td width="180px">24px (1.5rem)</Td>
            <Td width="180px">300 Medium (500)</Td>
            <Td width="180px">32px (1.3333)</Td>
            <Td width="180px">-0.3px (-0.01875rem)</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <H4Text>H4</H4Text>
            </Th>
            <Td>
              <H4Text>다람쥐 헌 쳇바퀴에 타고파</H4Text>
            </Td>
            <Td width="180px">19px (1.1875rem)</Td>
            <Td width="180px">400 Bold (700)</Td>
            <Td width="180px">26px (1.3684)</Td>
            <Td width="180px">-0.1px (-0.00625rem)</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Subtitle1Text>Subtitle1</Subtitle1Text>
            </Th>
            <Td>
              <Subtitle1Text>다람쥐 헌 쳇바퀴에 타고파</Subtitle1Text>
            </Td>
            <Td width="180px">16px (1rem)</Td>
            <Td width="180px">400 Bold (700)</Td>
            <Td width="180px">20px (1.25)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Subtitle2Text>Subtitle2</Subtitle2Text>
            </Th>
            <Td>
              <Subtitle2Text>다람쥐 헌 쳇바퀴에 타고파</Subtitle2Text>
            </Td>
            <Td width="180px">14px (0.875rem)</Td>
            <Td width="180px">400 Bold (700)</Td>
            <Td width="180px">18px (1.2857)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Body1200Text>Body1 (Body1_200)</Body1200Text>
              <br />
              <Body1300Text>Body1_300</Body1300Text>
              <br />
              <Body1400Text>Body1_400</Body1400Text>
            </Th>
            <Td>
              <Body1200Text>다람쥐 헌 쳇바퀴에 타고파</Body1200Text>
              <br />
              <Body1300Text>다람쥐 헌 쳇바퀴에 타고파</Body1300Text>
              <br />
              <Body1400Text>다람쥐 헌 쳇바퀴에 타고파</Body1400Text>
            </Td>
            <Td width="180px">16px (1rem)</Td>
            <Td width="180px">
              200 Regular (400)
              <br />
              300 Medium (500)
              <br />
              400 Bold (700)
            </Td>
            <Td width="180px">22px (1.375)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Body2200Text>Body2 (Body2_200)</Body2200Text>
              <br />
              <Body2300Text>Body2_300</Body2300Text>
              <br />
              <Body2400Text>Body2_400</Body2400Text>
            </Th>
            <Td>
              <Body2200Text>다람쥐 헌 쳇바퀴에 타고파</Body2200Text>
              <br />
              <Body2300Text>다람쥐 헌 쳇바퀴에 타고파</Body2300Text>
              <br />
              <Body2400Text>다람쥐 헌 쳇바퀴에 타고파</Body2400Text>
            </Td>
            <Td width="180px">14px (0.875rem)</Td>
            <Td width="180px">
              200 Regular (400)
              <br />
              300 Medium (500)
              <br />
              400 Bold (700)
            </Td>
            <Td width="180px">20px (1.4286)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Body3200Text>Body3 (Body3_200)</Body3200Text>
              <br />
              <Body3300Text>Body3_300</Body3300Text>
              <br />
              <Body3400Text>Body3_400</Body3400Text>
            </Th>
            <Td>
              <Body3200Text>다람쥐 헌 쳇바퀴에 타고파</Body3200Text>
              <br />
              <Body3300Text>다람쥐 헌 쳇바퀴에 타고파</Body3300Text>
              <br />
              <Body3400Text>다람쥐 헌 쳇바퀴에 타고파</Body3400Text>
            </Td>
            <Td width="180px">13px (0.8125rem)</Td>
            <Td width="180px">
              200 Regular (400)
              <br />
              300 Medium (500)
              <br />
              400 Bold (700)
            </Td>
            <Td width="180px">18px (1.3846)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <Caption200Text>Caption (Caption_200)</Caption200Text>
              <br />
              <Caption300Text>Caption_300</Caption300Text>
            </Th>
            <Td>
              <Caption200Text>다람쥐 헌 쳇바퀴에 타고파</Caption200Text>
              <br />
              <Caption300Text>다람쥐 헌 쳇바퀴에 타고파</Caption300Text>
            </Td>
            <Td width="180px">12px (0.75rem)</Td>
            <Td width="180px">
              200 Regular (400)
              <br />
              300 Medium (500)
            </Td>
            <Td width="180px">16px (1.3333)</Td>
            <Td width="180px">0</Td>
          </Tr>
          <Tr>
            <Th width="180px">
              <SubCaptionText>SubCaption</SubCaptionText>
            </Th>
            <Td>
              <SubCaptionText>다람쥐 헌 쳇바퀴에 타고파</SubCaptionText>
            </Td>
            <Td width="180px">10px (0.625rem)</Td>
            <Td width="180px">400 Bold (700)</Td>
            <Td width="180px">18px (1.4)</Td>
            <Td width="180px">0.2px (0.125rem)</Td>
          </Tr>
        </Tbody>
      </Table>
    </Main>
  </>
);
